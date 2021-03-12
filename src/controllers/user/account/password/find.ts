import { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import { UserINFO, UserInfoSchema } from '../../../../db/schema/userInfo.schema';
import { createJWT } from '../../../../jwt';
import { HTTPError } from '../../../../types/error';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Find(req: Request, res: Response, next: NextFunction): void {
    const { email, quiz, answer } = req.body;
    UserInfoSchema.findOneAndUpdate(
        {
            email: email,
            pwdQuestType: quiz,
            pwdAnswer: answer,
        },
        { userPwd: config['resetPassword'] }
    ).exec(function (err, docs: UserINFO) {
        if (docs) {
            const token = createJWT(docs, '1h');
            if (token) {
                res.json({
                    statusCode: 200,
                    message: 'find token',
                    token: token,
                });
            } else {
                next(new HTTPError(403, 'token create fail'));
            }
        } else {
            next(new HTTPError(403, 'user info fail'));
        }
    });
}
