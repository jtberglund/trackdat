import { Router } from 'express';
import Logger from '../../loaders/logger';
import Package from '../../../common/types/Package';
import packagesDb from '../../models/packages.model';
// import { ok, err } from 'true-myth/result';
import * as R from 'ramda';
import google from 'googleapis';

// const validatePackageBody = (newPackage: any) => {
//     if(typeof newPackage !== 'object') {
//         return err({code: 400, text: 'Incorrect request body format'});
//     }

//     const validationRules = {
//         carrier: [isValidCarrier],
//         trackingNumber: [isString],
//     }

//     const normalizedInput = (normalize(validationRules, newPackage));

//     return Object.keys(normalizedInput).
// }

// const oauth = google.oauth2_v2.

// const fromPromise = <T>(f: () => Promise<T>) => {
//     return ok();
// };

const route = Router();
export default (router: Router) => {
    const packages: Package[] = [];

    router.use('/packages', route);

    route.get('/', async (req, res, next) => {
        Logger.info('packages request');
        // return res.json({
        //     packages,
        // });
        const p = packagesDb.find({});
        packagesDb.find({}, (err, result) => {
            if (err) {
                // TODO
            }
            res.send({ packages: result });
        });
    }); // TODO return user packages

    route.get('/:id', async (req, res, next) => {
        const { id } = req.params;
        Logger.info('get package by id ' + id);
        packagesDb.findOne({ id }, (err, result) => {
            if (err) {
                res.status(404).send(err);
            }
            res.send(result);
        });
        const pckg = await packagesDb.findOne({ id }).exec();
        return res.send(pckg);
    }); // TODO user package

    route.post('/', async (req, res, next) => {
        console.log('Adding new package:', req.body);
        packages.push(req.body);
        // packagesDb.create(); // TODO
        return res.json({
            success: true,
            package: {
                // TODO add created package details here
            },
        });
    }); // TODO create new user package

    route.delete('/'); // TODO delete package

    route.put('/'); // TODO update package
};
