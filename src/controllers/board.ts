import { Request, Response } from 'express';
import { CurriculumSchema } from '../db/schema/curriculum.schema';
import { FreeBoardSchema } from '../db/schema/freeboard.schema';
import { QASchema } from '../db/schema/qa.schema';
import { BoardWrapSchema } from '../db/schema/boardWrap.schema';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export async function getTypeRecentBoards(req: Request, res: Response) {
    const result = [];
    const domainType = req.params['type'];
    const recentCurriculum = await CurriculumSchema.find({ type: domainType })
        .sort({ regDate: -1 })
        .limit(5);
    const recentFreeboard = await FreeBoardSchema.find({ type: domainType })
        .sort({ regDate: -1 })
        .limit(5);
    const recentQNA = await QASchema.find({ type: domainType }).sort({ regDate: -1 }).limit(5);
    while (result.length < 5) {
        let temp = recentCurriculum[0]['regDate'];
        let inx = 0;
        if (temp < recentFreeboard[0]['regDate']) {
            temp = recentFreeboard[0]['regDate'];
            inx = 1;
        }
        if (temp < recentQNA[0]['regDate']) {
            temp = recentQNA[0]['regDate'];
            inx = 2;
        }
        switch (inx) {
            case 0:
                result.push(recentCurriculum.shift());
                break;
            case 1:
                result.push(recentFreeboard.shift());
                break;
            case 2:
                result.push(recentQNA.shift());
                break;
        }
    }
    return res.json(result);
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function getFreeboard(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function getFreeboardDetail(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function createFreeboard(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function updateFreeboard(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function deleteFreeboard(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function getCurriculum(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function getCurriculumDetail(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function createCurriculum(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function updateCurriculum(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function deleteCurriculum(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export async function getQNA(req: Request, res: Response) {
    const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
    const qnaIds: [string] = boardWrap['qna'];
    if (qnaIds) {
        let qnas = [];
        for (const id of qnaIds) {
            qnas = [...qnas, await QASchema.findById({ _id: id })];
        }
        return res.json(qnas);
    } else {
        return res.json({
            code: 500,
            message: 'qnaIds not found',
        });
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function getQNADetail(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export async function createQNA(req: Request, res: Response) {
    if (req.body) {
        const document = {
            title: req.body['title'],
            content: req.body['content'],
            regUser: '6044e99159adab64c4d10263',
            type: req.params['type'],
        };
        const qna = await QASchema.create(document);
        if (!qna) {
            return res.json({
                code: 500,
                message: 'Qna Document Creation Failed',
            });
        }
        const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
        if (boardWrap) {
            boardWrap['qna'].push(qna._id);
            await BoardWrapSchema.updateOne({ type: req.params['type'] }, boardWrap);
            return res.json({
                code: 200,
                message: 'Success',
            });
        } else {
            const newBoardWrap = {
                qa: [qna._id],
                type: req.params['type'],
            };
            await BoardWrapSchema.create(newBoardWrap);
            return res.json({
                code: 200,
                message: 'Success',
            });
        }
    } else {
        return res.json({
            code: 500,
            message: 'Body from require is missing',
        });
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function updateQNA(req: Request, res: Response) {
    // Todo
    return res.json();
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 * @return {JSON} res.json
 */
export function deleteQNA(req: Request, res: Response) {
    // Todo
    return res.json();
}
