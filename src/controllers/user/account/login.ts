import { NextFunction, Request, Response } from 'express';
import { UserINFO, UserInfoSchema } from '../../../db/schema/userInfo.schema';
import { HTTPError } from '../../../types/error';
import { createJWT } from '../../../jwt';
interface LoginInfo {
    email: string;
    password: string;
    platform: string;
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Login(req: Request, res: Response, next: NextFunction): void {
    const { email, password, platform }: LoginInfo = req.body;

    UserInfoSchema.findOne({
        email: email,
        userPwd: password,
    }).exec(function (err, docs: UserINFO) {
        if (docs) {
            const token = createJWT(docs);
            if (token) {
                res.json({
                    statusCode: 200,
                    message: 'logged in successfully',
                    token: token,
                });
            } else {
                next(new HTTPError(403, 'token create fail'));
            }
        } else {
            next(new HTTPError(403, 'login fail'));
        }
    });
}
