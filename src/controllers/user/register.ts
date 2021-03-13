import { NextFunction, Request, Response } from 'express';
import { pwdQuestion, UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
import { HTTPResult } from '../../types/result';
import { passwordEncrypt } from '../../utils/auth';

interface Term {
    TOS: string;
    PP: string;
}

interface CommonUserInfo {
    email: string;
    password: string;
    nickname: string;
    PWDQuestType: string;
    PWDAnswer: string;
    interest: unknown;
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Register(req: Request, res: Response, next: NextFunction): void {
    const type: string = req.query['type']?.toString();

    const { TOS, PP }: Term = req.body;

    if (TOS !== 'Y' || PP !== 'Y') {
        next(new HTTPError(400, 'TOS & PP is not agree'));
        return;
    }

    if (type === undefined) {
        let {
            email,
            password,
            nickname,
            PWDQuestType,
            PWDAnswer,
            interest,
        }: CommonUserInfo = req.body;

        password = password ? passwordEncrypt(password) : undefined;

        new UserInfoSchema({
            email: email,
            userPwd: password,
            nickname: nickname,
            pwdQuestType: PWDQuestType,
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
                next(new HTTPResult(200, 'Success'));
            }
        });
    } else {
        const { oauth }: { oauth: string } = req.body;
        console.log(`[Test] ${oauth}`);
        if (type === 'github') {
        } else if (type === 'kakao') {
        } else if (type === 'google') {
        } else {
            next(new HTTPError(400, 'oauth Type is incorrect'));
        }
    }
}
