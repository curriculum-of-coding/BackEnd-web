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
import { Info } from '../controllers/user/info';
// eslint-disable-next-line new-cap
const router = Router();
const printDictionary = (dict): string => {
    return `${Object.entries(dict).reduce(
        (acc, [key, value], idx) =>
            `${acc}${idx !== 0 ? ', ' : ''}'${key}': ${
                Number.isInteger(value) ? value : `'${value}'`
            }`,
        '{'
    )}}`;
};

router.all('/*', (req: Request, res: Response, next: NextFunction) => {
    if (!(req.header('node-test-header') === 'nodeTest')) {
        console.log(`[${new Date()}](${req.ip}) [${req.method}] ${req.url} `);
        console.log(`=> query: ${printDictionary(req.query)}, body: ${printDictionary(req.body)}`);
    }
    next();
});
router.get('/', Main);
router.get('/test', Test);
router.post('/api/register', Register);
router.get('/api/check', CheckUser);
router.get('/api/login', Login);
router.get('/api/user', Info);
router.delete('/api/account', authCheck, Delete);
router.post('/api/account/password', Find);
router.put('/api/account/password', authCheck, Change);

export default router;
