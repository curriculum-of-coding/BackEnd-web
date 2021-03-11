import { NextFunction, Request, Response } from 'express';
import { UserINFO, UserInfoSchema } from '../../../db/schema/userInfo.schema';
import * as jwt from 'jsonwebtoken';
import { HTTPError } from '../../../types/error';
import config from '../../../config';
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
        if (docs != null) {
            jwt.sign(
                {
                    email: docs.email,
                    nickname: docs.nickname,
                    isSuperUser: docs.isSuperUser,
                },
                config['JWT_SECRET'],
                {
                    expiresIn: '1d',
                },
                (err, token) => {
                    if (err) {
                        next(new HTTPError(403, 'login fail'));
                    } else {
                        res.json({
                            message: 'logged in successfully',
                            token,
                        });
                    }
                }
            );
        } else {
            next(new HTTPError(403, 'login fail'));
        }
    });
}
