import { Router, NextFunction, Request, Response } from 'express';
import * as errors from '../types/error';
import * as notice from '../controllers/notice';
import * as board from '../controllers/board';
import { Main } from '../controllers/main';
import { Test } from '../controllers/test';
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
// board_notice
router.get('/api/board/notice', notice.getNotice);
router.get('/api/board/notice/:id', notice.getNoticeDetail);
router.post('/api/board/notice/create', notice.createNotice);
// Todo: board_api
router.get('/api/board/:type', board.getTypeRecentBoards);
router.get('/api/board/:type/freeboard', board.getFreeboard);
router.get('/api/board/:type/freeboard/:id', board.getFreeboardDetail);
router.post('/api/board/:type/freeboard/create', board.createFreeboard);
router.post('/api/board/:type/freeboard/:id/update', board.updateFreeboard);
router.get('/api/board/:type/curriculum', board.getCurriculum);
router.get('/api/board/:type/curriculum/:id', board.getCurriculumDetail);
router.post('/api/board/:type/curriculum/create', board.createCurriculum);
router.post('/api/board/:type/curriculum/:id/update', board.updateCurriculum);
router.get('/api/board/:type/QNA', board.getQNA);
router.get('/api/board/:type/QNA/:id', board.getQNADetail);
router.post('/api/board/:type/QNA/create', board.createQNA);
router.post('/api/board/:type/QNA/:id/update', board.updateQNA);

export default router;
