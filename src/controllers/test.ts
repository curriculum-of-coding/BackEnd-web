import { Request, Response } from 'express';
import { TestSchema } from '../db/schema/test.schema';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 */
export function Test(req: Request, res: Response): void {
    const email = req.query['email'] ?? `test${Math.random()}`;
    const password = req.query['password'] ?? 'test';
    const nickname = req.query['nickname'] ?? 'nickname';
    new TestSchema({ email: email, password: password, nickname: nickname }).save((err, test) => {
        if (err) console.log(err);
        res.send(test);
    });
}
