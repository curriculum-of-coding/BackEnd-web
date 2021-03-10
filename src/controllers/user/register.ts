import { NextFunction, Request, Response } from 'express';
import { pwdQuestion, UserSchema } from '../../db/schema/user/user.schema';
import { HTTPError } from '../../types/error';

interface Term {
    TOS: string;
    PP: string;
}

interface CommonUserInfo {
    email: string;
    password: string;
    nickname: string;
    PWDQuestType?: number;
    PWDAnswer: string;
    interest: unknown;
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const type: string = req.query['type']?.toString();

    const { TOS, PP }: Term = req.body;

    if (TOS !== 'Y' || PP !== 'Y') {
        next(new HTTPError(400, 'TOS & PP is not agree'));
        return;
    }

    if (type === undefined) {
        const {
            email,
            password,
            nickname,
            PWDQuestType,
            PWDAnswer,
            interest,
        }: CommonUserInfo = req.body;

        if (PWDQuestType < 0 || PWDQuestType >= pwdQuestion.length) {
            next(new HTTPError(400, 'PWDQuestType is incorrect'));
            return;
        }

        UserSchema.statics
            .updateUser({
                email: email,
                userPwd: password,
                nickname: nickname,
                pwdQuestType: PWDQuestType,
                pwdAnswer: PWDAnswer,
                interests: interest,
                TOS_YN: TOS === 'Y',
                PP_YN: PP === 'Y',
            })
            .then(function () {
                res.send({
                    statusCode: 200,
                    message: 'Success',
                });
            })
            .catch(function (err) {
                console.log(err);
                next(new HTTPError(400, err));
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
