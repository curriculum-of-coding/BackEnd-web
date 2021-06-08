import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function authCheck(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];

        jwt.verify(token, config['JWT_SECRET'], (err: unknown) => {
            if (err) {
                res.status(401).json({ statusCode: 401, error: 'authorization error' });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ statusCode: 401, error: 'authorization is invalid' });
    }
}
