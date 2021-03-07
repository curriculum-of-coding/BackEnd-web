import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function CheckUser(req: Request, res: Response, next: NextFunction): void {
    const type: string = req.query['type']?.toString();

    if (type === 'email') {
        const email: string = req.query['email']?.toString();
        UserInfoSchema.find({
            email: email,
        }).exec(function (err, docs) {
            if (err || docs.length) {
                next(new HTTPError(400, 'id is overlap'));
            } else {
                res.send({
                    statusCode: 200,
                    message: 'id is not overlap',
                });
            }
        });
    } else {
        next(new HTTPError(400, 'find type is undefined'));
    }
}
