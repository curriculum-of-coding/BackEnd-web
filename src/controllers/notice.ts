import { Request, Response } from 'express';
import { NoticeSchema } from '../db/schema/notice.schema';

const boardPerPage = 10;

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {Response.json}
 */
export async function getNotice(req: Request, res: Response) {
    const notices = await NoticeSchema.find().sort({ regDate: -1 });
    if (!notices) {
        return res.json({
            code: 500,
            message: 'cannot find notices',
        });
    }
    const numTotalNotices = notices.length;
    const currentPage = Number(req.query.currentPage);
    const totalPages = Math.ceil(numTotalNotices / boardPerPage);
    let start;
    let end;
    if (currentPage < totalPages) {
        start = currentPage * 10;
        end = start + 10;
    } else if (currentPage == totalPages) {
        start = currentPage * 10;
        end = numTotalNotices;
    } else {
        return res.json({
            code: 400,
            message: 'Invalid Page Number',
        });
    }
    let resultNotices = [];
    for (const notice of notices.slice(start, end)) {
        resultNotices = [
            ...resultNotices,
            {
                _id: notice['_id'],
                title: notice['title'],
                noticeType: notice['noticeType'],
                content: notice['content'],
                regUser: notice['regUser'],
                regDate: notice['regDate'],
            },
        ];
    }
    const result = {
        totalPages: totalPages,
        notices: resultNotices,
    };
    return res.json(result);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {Response.json}
 */
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
export async function createNotice(req: Request, res: Response) {
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
export async function updateNotice(req: Request, res: Response) {
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
export async function deleteNotice(req: Request, res: Response) {
    // Todo
    return res.json();
}
