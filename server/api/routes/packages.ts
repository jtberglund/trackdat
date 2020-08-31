import { Router } from 'express';
import Logger from '../../loaders/logger';
import Package from '../../../common/types/Package';

const route = Router();
export default (router: Router) => {
    const packages: Package[] = [];

    router.use('/packages', route);

    route.get('/', async (req, res, next) => {
        Logger.info('packages request');
        return res.json({
            packages,
        });
    }); // TODO return user packages

    route.get('/:id'); // TODO user package

    route.post('/', async (req, res, next) => {
        console.log('Adding new package:', req.body);
        packages.push(req.body);
        return res.json({ success: true });
    }); // TODO create new user package

    route.delete('/'); // TODO delete package

    route.put('/'); // TODO update package
};
