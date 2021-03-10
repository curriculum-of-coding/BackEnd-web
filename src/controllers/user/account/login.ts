import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { HTTPError } from '../../../types/error';
import config from '../../../config';
import { UserModel } from '../../../db/schema/user/user.model';
import { IUser } from '../../../db/schema/user/user.types';
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

    UserModel.findOne({
        email: email,
        userPwd: password,
    }).exec(function (err, docs: IUser) {
        if (docs) {
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
                        next(new HTTPError(403, `login fail 2 / ${err}`));
                    } else {
                        res.json({
                            message: 'logged in successfully',
                            token,
                        });
                    }
                }
            );
        } else {
            next(new HTTPError(403, `login fail 1 / ${err}`));
        }
    });
}
