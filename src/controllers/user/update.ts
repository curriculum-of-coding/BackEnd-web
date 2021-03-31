import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
import { veriftJWT } from '../../utils/auth';
import { HTTPResult } from '../../types/result';

interface IUserUpdateInfo {
    email: string;
    interests: unknown;
    isSuperUser: boolean;
    nickname: string;
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: string = req.headers.authorization.split('Bearer ')[1];
    const decode = veriftJWT(token);

    if (decode) {
        let { email, interests, isSuperUser, nickname }: IUserUpdateInfo = req.body;

        if (email !== decode['email']) {
            email = decode['email'];
        }

        const interest = [];
        interest.push(interests);

        const docs = await UserInfoSchema.findOneAndUpdate(
            {
                email: email,
            },
            { interests: interest, isSuperUser: isSuperUser ?? false, nickname: nickname }
        ).exec();

        if (docs) {
            next(new HTTPResult(200, 'Success'));
        } else {
            next(new HTTPError(403, 'user info update fail'));
        }
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
