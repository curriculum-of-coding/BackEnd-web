import { NextFunction, Request, Response } from 'express';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Delete(req: Request, res: Response, next: NextFunction): void {
    const token: string = req.headers.authorization.split('Bearer ')[1];

    // TODO: Find token to User and Delete
}
