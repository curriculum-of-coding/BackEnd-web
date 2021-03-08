import { NextFunction, Request, Response } from 'express';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Login(req: Request, res: Response, next: NextFunction): void {
    const email: string = req.body['email'];
    const password: string = req.body['password'];
    const platform: string = req.body['platform'];

    // TODO: Check Login
}
