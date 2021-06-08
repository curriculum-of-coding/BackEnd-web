import { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import { UserInfoSchema } from '../../../../db/schema/userInfo.schema';
import { passwordEncrypt, veriftJWT } from '../../../../utils/auth';
import { HTTPError } from '../../../../types/error';
import { HTTPResult } from '../../../../types/result';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function Change(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: string = req.headers.authorization.split('Bearer ')[1];
    let { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
        next(new HTTPError(403, 'password is same'));
        return;
    }
    oldPassword = passwordEncrypt(oldPassword);
    newPassword = passwordEncrypt(newPassword);
    const decode = veriftJWT(token);

    if (decode) {
        const docs = await UserInfoSchema.findOneAndUpdate(
            {
                email: decode['email'],
                $or: [{ userPwd: oldPassword }, { userPwd: config['RESET_PASSWORD_KEY'] }],
            },
            { userPwd: newPassword }
        ).exec();

        if (docs) {
            next(new HTTPResult(200, 'Success'));
        } else {
            next(new HTTPError(403, 'user info fail'));
        }
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
