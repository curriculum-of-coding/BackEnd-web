import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
import { HTTPResult } from '../../types/result';

const queryType: string[] = ['email', 'nickname'];

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function CheckUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const type: string = req.query['type']?.toString();

    if (queryType.includes(type)) {
        const key: string = req.query[type]?.toString();
        if (key) {
            const docs = await UserInfoSchema.find({ [type]: key }).exec();

            if (docs && docs.length) {
                next(new HTTPError(400, `${type} is overlap`));
            } else {
                next(new HTTPResult(200, `${type} is not overlap`));
            }
        } else {
            next(new HTTPError(400, 'find value is undefined'));
        }
    } else {
        next(new HTTPError(400, 'find type is undefined'));
    }
}
