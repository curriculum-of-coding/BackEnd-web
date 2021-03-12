import { NextFunction, Request, Response } from 'express';
import { UserINFO, UserInfoSchema } from '../../../db/schema/userInfo.schema';
import { veriftJWT } from '../../../jwt';
import { HTTPError } from '../../../types/error';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Delete(req: Request, res: Response, next: NextFunction): void {
    const token: string = req.headers.authorization.split('Bearer ')[1];
    const decode = veriftJWT(token);
    if (decode) {
        UserInfoSchema.findOneAndDelete({
            email: decode['email'],
        }).exec(function (err, docs: UserINFO) {
            if (docs) {
                res.json({
                    statusCode: 200,
                    message: 'Success',
                });
            } else {
                next(new HTTPError(403, 'user info fail'));
            }
        });
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
