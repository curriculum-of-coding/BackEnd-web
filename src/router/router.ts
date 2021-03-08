import { Router, NextFunction, Request, Response } from 'express';
import { Main } from '../controllers/main';
import { Test } from '../controllers/test';
import { CheckUser } from '../controllers/user/check';
import { Register } from '../controllers/user/register';
import { authCheck } from '../middleware/authCheck';
import { Delete } from '../controllers/user/account/delete';
import { Login } from '../controllers/user/account/login';
import { Find } from '../controllers/user/account/password/find';
import { Change } from '../controllers/user/account/password/change';
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
router.get('/api/login', Login);
router.delete('/api/account', authCheck, Delete);
router.post('/api/account/password', authCheck, Find);
router.put('/api/account/password', authCheck, Change);

export default router;
