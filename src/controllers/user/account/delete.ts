import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../../db/schema/userInfo.schema';
import { veriftJWT } from '../../../utils/auth';
import { HTTPError } from '../../../types/error';
import { HTTPResult } from '../../../types/result';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: string = req.headers.authorization.split('Bearer ')[1];
    const decode = veriftJWT(token);

    if (decode) {
        const docs = await UserInfoSchema.findOneAndDelete({
            email: decode['email'],
        }).exec();

        if (docs) {
            next(new HTTPResult(200, 'Success'));
        } else {
            next(new HTTPError(403, 'user info fail'));
        }
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
