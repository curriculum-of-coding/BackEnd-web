import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
import { HTTPResult } from '../../types/result';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Info(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.query['email']?.toString();

    if (email && email.length > 0) {
        const docs = await UserInfoSchema.findOne({ email: email }).exec();
        if (docs) {
            next(
                new HTTPResult(200, 'success', {
                    nickname: docs.nickname,
                    email: docs.email,
                    regDate: docs.regDate,
                    interests: docs.interests,
                    isSuperUser: docs.isSuperUser,
                })
            );
        } else {
            next(new HTTPError(400, 'no user'));
        }
    } else {
        next(new HTTPError(400, 'param error'));
    }
}
