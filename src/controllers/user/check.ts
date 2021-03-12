import { NextFunction, Request, Response } from 'express';
import { UserInfoSchema } from '../../db/schema/userInfo.schema';
import { HTTPError } from '../../types/error';
import { HTTPResult } from '../../types/result';
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function CheckUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const type: string = req.query['type']?.toString();

    if (type === 'email') {
        const email: string = req.query['email']?.toString();
        const docs = await UserInfoSchema.find({
            email: email,
        }).exec();

        if (docs && docs.length) {
            next(new HTTPError(400, 'id is overlap'));
        } else {
            next(new HTTPResult(200, 'id is not overlap'));
        }
    } else {
        next(new HTTPError(400, 'find type is undefined'));
    }
}
