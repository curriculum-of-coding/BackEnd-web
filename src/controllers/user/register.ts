import { NextFunction, Request, Response } from 'express';
import { pwdQuestion, UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Register(req: Request, res: Response, next: NextFunction): void {
    const type: string = req.query['type']?.toString();
    const TOS: string = req.body['TOS'] ?? 'N';
    const PP: string = req.body['PP'] ?? 'N';

    if (TOS === 'N' || PP == 'N') {
        next(new HTTPError(400, 'TOS & PP is not agree'));
        return;
    }

    if (type === undefined) {
        const email: string = req.body['email'] ?? `test${Math.random()}`;
        const password: string = req.body['password'];
        const nickname: string = req.body['nickname'] ?? 'nickname';
        const PWDQuestType: number = Number(req.body['PWDQuestType']) ?? -1;
        const PWDAnswer: string = req.body['PWDAnswer'];
        const interest = req.body['interest'];
        if (PWDQuestType < 0 || PWDQuestType >= pwdQuestion.length) {
            next(new HTTPError(400, 'PWDQuestType is incorrect'));
            return;
        }
        new UserInfoSchema({
            email: email,
            userPwd: password,
            nickname: nickname,
            pwdQuestType: pwdQuestion[PWDQuestType],
            pwdAnswer: PWDAnswer,
            interests: interest,
            TOS_YN: TOS === 'Y',
            PP_YN: PP === 'Y',
        }).save((err, docs) => {
            if (err) {
                // console.log(err);
                if (err.keyPattern?.email) {
                    next(new HTTPError(400, 'id is overlap'));
                } else if (err.path === 'pwdQuestType') {
                    next(new HTTPError(400, 'pwdQuestType is incorrect'));
                } else {
                    next(new HTTPError(400, 'Something is wrong'));
                }
            } else {
                res.send({
                    statusCode: 200,
                    message: 'Success',
                });
            }
        });
    } else {
        const oauth: string = req.body['oauth'];
        if (type === 'github') {
        } else if (type === 'kakao') {
        } else if (type === 'google') {
        } else {
            next(new HTTPError(400, 'oauth Type is incorrect'));
        }
    }
}
