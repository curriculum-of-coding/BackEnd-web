import { Request, Response } from 'express';
import { NoticeSchema } from '../db/schema/notice.schema';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {Response.json}
 */
export async function getNotice(req: Request, res: Response) {
    const query = {
        ...req.query,
    };

    const board = await NoticeSchema.find(query);
    if (!board) {
        return res.status(404).json({
            message: 'board not found!',
        });
    }
    return res.json(board);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {Response.json}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getNoticeDetail(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {Response.json}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createNotice(req: Request, res: Response) {
    // Todo
    return res.json();
}
