import { Router } from 'express';
import packages from './routes/packages';
import auth from './routes/auth';

export default () => {
    const router = Router();
    packages(router);
    auth(router);

    return router;
};
