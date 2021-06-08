import { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import { UserInfoSchema } from '../../../../db/schema/userInfo.schema';
import { createJWT } from '../../../../utils/auth';
import { HTTPError } from '../../../../types/error';
import { HTTPResult } from '../../../../types/result';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Find(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, quiz, answer } = req.body;
    const docs = await UserInfoSchema.findOneAndUpdate(
        {
            email: email,
            pwdQuestType: quiz,
            pwdAnswer: answer,
        },
        { userPwd: config['RESET_PASSWORD_KEY'] }
    ).exec();

    if (docs) {
        const token = createJWT(docs, '1h');
        if (token) {
            next(new HTTPResult(200, 'password is reset', { token: token }));
        } else {
            next(new HTTPError(403, 'token create fail'));
        }
    } else {
        next(new HTTPError(403, 'user info fail'));
    }
}
