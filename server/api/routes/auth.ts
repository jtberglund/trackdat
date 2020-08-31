import { Router } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = 'secret123';

const route = Router();
export default (router: Router) => {
    router.use('/auth', route);

    route.post('/signup/google', (req, res) => {
        // TODO save user to DB
    });

    route.post('/signin/google', (req, res) => {
        // TODO is this needed???

        // return JWT as cookie
        const token = jwt.sign({ user: 'johndoe' }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.json({ success: true });
    });

    route.post('/signout', (req, res) => {
        res.cookie('token', '', { expires: new Date(0) });
        res.json({ success: true });
    });
};
