import { NextFunction, Request, Response } from 'express';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Change(req: Request, res: Response, next: NextFunction): void {
    const token: string = req.headers.authorization.split('Bearer ')[1];
}
