import { Router } from 'express';
import packages from './routes/packages';

export default () => {
    const router = Router();
    packages(router);

    return router;
};
