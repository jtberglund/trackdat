import type { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import Logger from './logger';
import { getRoutes } from '../utils/express-util';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model';

// https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/express.ts
export default ({ app }: { app: Application }) => {
    passport.use(
        new Strategy(
            {
                secretOrKey: 'secret123',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            (jwtPayload, done) => {
                console.log(jwtPayload);
                User.findOne({ id: jwtPayload.sub }, function (err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                        // or you could create a new account
                    }
                });
            }
        )
    );

    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).send('ok').end();
    });
    app.head('/status', (req, res) => {
        res.status(200).send('ok').end();
    });

    app.enable('trust proxy');

    // Enable CORS for development
    app.use(
        cors({
            origin: 'http://localhost:5000',
        })
    );

    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    app.use(require('method-override')());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    app.use(cookieParser());

    // Load API routes
    const router = routes();
    app.use(config.api.prefix, router);
    let registeredEndpoints = '\nREGISTERED ENDPOINTS';
    Logger.info(app._router.stack);
    getRoutes(app).forEach((r) => (registeredEndpoints += '\n- ' + r));
    Logger.info(registeredEndpoints);

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
