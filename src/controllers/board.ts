import { Request, Response } from 'express';
import { CurriculumSchema } from '../db/schema/curriculum.schema';
import { FreeBoardSchema } from '../db/schema/freeboard.schema';
import { QASchema } from '../db/schema/qa.schema';
import { BoardWrapSchema } from '../db/schema/boardWrap.schema';

const boardPerPage = 10;
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
    const qaIds: [string] = boardWrap['qa'];
    const numTotalBoards = qaIds.length;
    const totalPages = Math.ceil(numTotalBoards / boardPerPage);
    const currentPage = Number(req.query.currentPage) + 1;
    if (qaIds) {
        let qas = [];
        let start;
        let end;
        if (currentPage < totalPages) {
            start = numTotalBoards - currentPage * 10;
            end = start + 10;
        } else if (currentPage == totalPages) {
            start = 0;
            end = numTotalBoards % 10;
        } else {
            return res.json({
                code: 400,
                message: 'invalid page number',
            });
        }
        for (const id of qaIds.slice(start, end).reverse()) {
            const qa = await QASchema.findById({ _id: id });
            qas = [
                ...qas,
                {
                    title: qa['title'],
                    type: qa['type'],
                    _id: qa['_id'],
                    regUser: qa['regUser'],
                    regDate: qa['regDate'],
                },
            ];
        }
        const result = {
            totalPages: totalPages,
            qas,
        };
        return res.json(result);
    } else {
        return res.json({
            code: 500,
            message: 'qaIds not found',
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
export async function getQNADetail(req: Request, res: Response) {
    const detail = await QASchema.findById({ _id: req.params['id'] });
    const result = {
        _id: detail['_id'],
        title: detail['title'],
        content: detail['content'],
        type: detail['type'],
        regUser: detail['regUser'],
        regDate: detail['regDate'],
    };
    return res.json(result);
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
        const tempQa = {
            regUser: '60478f2229741a452cb882ba',
            title: req.body['title'],
            content: req.body['content'],
            type: req.params['type'],
        };
        const asignedQa = await QASchema.create(tempQa);
        if (!asignedQa) {
            return res.json({
                code: 500,
                message: 'asignedQa Document Creation Failed',
            });
        }

        let boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
        // 조건문을 걸어준다.

        if (!boardWrap) {
            const boardWrapTemp = { type: req.params['type'] };
            boardWrap = await BoardWrapSchema.create(boardWrapTemp);
        }
        boardWrap['qa'].push(asignedQa['_id']);
        await BoardWrapSchema.update({ type: req.params['type'] }, boardWrap);
        return res.json({
            code: 200,
            message: 'Success',
        });
    } else {
        return res.json({
            code: 500,
            message: 'Body for create from require is missing',
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
export async function updateQNA(req: Request, res: Response) {
    if (req.body) {
        const qa = await QASchema.findById({ _id: req.params['id'] });
        qa['title'] = req.body['title'];
        qa['content'] = req.body['content'];
        await QASchema.findByIdAndUpdate({ _id: req.params['id'] }, qa);
        return res.json({
            code: 200,
            message: 'Success',
        });
    } else {
        res.json({
            code: 500,
            message: 'Body for update from from require is missing',
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
export async function deleteQNA(req: Request, res: Response) {
    await QASchema.findByIdAndDelete({ _id: req.params['id'] });
    const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
    const qaIds: [string] = boardWrap['qa'];
    qaIds.slice(qaIds.indexOf(req.params['id']), 1);
    boardWrap['qa'] = qaIds;
    await QASchema.updateOne({ type: req.params['type'] }, boardWrap);
    return res.json({
        code: 200,
        message: 'Success',
    });
}
