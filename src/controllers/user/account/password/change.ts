import { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import { UserINFO, UserInfoSchema } from '../../../../db/schema/userInfo.schema';
import { IJWT, veriftJWT } from '../../../../jwt';
import { HTTPError } from '../../../../types/error';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function Change(req: Request, res: Response, next: NextFunction): void {
    const token: string = req.headers.authorization.split('Bearer ')[1];
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
        next(new HTTPError(403, 'password is same'));
        return;
    }
    const decode = veriftJWT(token);
    if (decode) {
        UserInfoSchema.findOneAndUpdate(
            {
                email: decode['email'],
                $or: [{ userPwd: oldPassword }, { userPwd: config['resetPassword'] }],
            },
            { userPwd: newPassword }
        ).exec(function (err, docs: UserINFO) {
            if (docs) {
                res.json({
                    statusCode: 200,
                    message: 'Success',
                });
            } else {
                next(new HTTPError(403, 'user info fail'));
            }
        });
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
