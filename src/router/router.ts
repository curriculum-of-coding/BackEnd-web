import { Router, NextFunction, Request, Response } from 'express';
import * as errors from '../types/error';
import * as notice from '../controllers/notice';
import * as board from '../controllers/board';
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
import { Update } from '../controllers/user/update';
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
// board_notice
router.get('/api/board/notice', notice.getNotice);
router.get('/api/board/notice/:id', notice.getNoticeDetail);
router.post('/api/board/notice/create', notice.createNotice);
router.post('/api/board/notice/:id/update', notice.updateNotice);
router.post('/api/board/notice/:id/delete', notice.deleteNotice);
// Todo: board_api
router.get('/api/board/:type', board.getTypeRecentBoards);
router.get('/api/board/:type/freeboard', board.getFreeboard);
router.get('/api/board/:type/freeboard/:id', board.getFreeboardDetail);
router.post('/api/board/:type/freeboard/create', board.createFreeboard);
router.post('/api/board/:type/freeboard/:id/update', board.updateFreeboard);
router.delete('/api/board/:type/freeboard/:id/delete', board.deleteFreeboard);
router.get('/api/board/:type/curriculum', board.getCurriculum);
router.get('/api/board/:type/curriculum/:id', board.getCurriculumDetail);
router.post('/api/board/:type/curriculum/create', board.createCurriculum);
router.post('/api/board/:type/curriculum/:id/update', board.updateCurriculum);
router.delete('/api/board/:type/curriculum/:id/delete', board.deleteCurriculum);
router.get('/api/board/:type/QNA', board.getQNA);
router.get('/api/board/:type/QNA/:id', board.getQNADetail);
router.post('/api/board/:type/QNA/create', board.createQNA);
router.post('/api/board/:type/QNA/:id/update', board.updateQNA);
router.delete('/api/board/:type/QNA/:id/delete', board.deleteQNA);
// user api
router.get('/api/check', CheckUser);
router.post('/api/login', Login);
router.get('/api/user', Info);
router.put('/api/user', Update);
router.delete('/api/account', authCheck, Delete);
router.post('/api/account/password', Find);
router.put('/api/account/password', authCheck, Change);

export default router;
