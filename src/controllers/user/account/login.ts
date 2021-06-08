import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../../db/schema/userInfo.schema';
import { HTTPError } from '../../../types/error';
import { createJWT, passwordEncrypt } from '../../../utils/auth';
import { HTTPResult } from '../../../types/result';
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
export async function Login(req: Request, res: Response, next: NextFunction): Promise<void> {
    let { email, password, platform }: LoginInfo = req.body;
    password = passwordEncrypt(password);

    const docs = await UserInfoSchema.findOne({
        email: email,
        userPwd: password,
    }).exec();

    if (docs) {
        const token = createJWT(docs);
        if (token) {
            next(new HTTPResult(200, 'logged in successfully', { token: token }));
        } else {
            next(new HTTPError(403, 'token create fail'));
        }
    } else {
        next(new HTTPError(403, 'login fail'));
    }
}
