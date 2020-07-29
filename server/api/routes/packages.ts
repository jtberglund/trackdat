import { Router } from 'express';

const route = Router();
export default (router: Router) => {
    router.use('/packages', route);

    router.get('/');
};
