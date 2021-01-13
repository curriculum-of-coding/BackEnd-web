import { Router, NextFunction, Request, Response } from 'express';
import { Main } from '../controllers/main';
import { Test } from '../controllers/test';
// eslint-disable-next-line new-cap
const router = Router();

router.all('/*', (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.ip}] ${req.url} `);
  next();
});
router.get('/', Main);
router.get('/test', Test);

export default router;
