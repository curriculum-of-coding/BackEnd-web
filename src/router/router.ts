import { Router, NextFunction, Request, Response } from 'express';
import { Main } from '../controllers/main';
import { Test } from '../controllers/test';
import { CheckUser } from '../controllers/user/check';
import { Register } from '../controllers/user/register';
// eslint-disable-next-line new-cap
const router = Router();

router.all('/*', (req: Request, res: Response, next: NextFunction) => {
    if (!(req.header('node-test-header') === 'nodeTest')) {
        console.log(`[${req.ip}] ${req.url} `);
    }
    next();
});
router.get('/', Main);
router.get('/test', Test);
router.post('/api/register', Register);
router.get('/api/check', CheckUser);

export default router;
