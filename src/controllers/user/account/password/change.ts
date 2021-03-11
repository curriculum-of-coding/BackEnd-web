import e, { NextFunction, Request, Response } from 'express';
import config from '../../../../config';
import * as jwt from 'jsonwebtoken';
import { UserINFO, UserInfoSchema } from '../../../../db/schema/userInfo.schema';
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
    const decode = jwt.verify(token, config['JWT_SECRET']);
    if (decode) {
        UserInfoSchema.findOne({
            email: decode.email,
            userPwd: oldPassword,
        }).exec(function (err, docs: UserINFO) {
            if (docs != null) {
                UserInfoSchema.updateOne(
                    { email: decode.email },
                    { userPwd: newPassword },
                    function (err, raw) {
                        if (err || raw.ok !== 1) {
                            next(new HTTPError(403, 'update fail'));
                        } else {
                            res.json({
                                statusCode: 200,
                                message: 'Success',
                            });
                        }
                    }
                );
            } else {
                next(new HTTPError(403, 'user info fail'));
            }
        });
    } else {
        next(new HTTPError(403, 'valid fail'));
    }
}
