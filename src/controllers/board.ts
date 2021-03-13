import { Request, Response } from 'express';
import { classifyLikeHate } from '../db/method/like.method';
import { BoardWrapSchema } from '../db/schema/boardWrap.schema';
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
    if (recentFreeboard.length + recentQNA.length + recentCurriculum.length <= 5) {
        result.push(...recentCurriculum);
        result.push(...recentFreeboard);
        result.push(...recentQNA);
    } else {
        while (result.length < 5) {
            let temp;
            let inx;
            if (recentCurriculum.length > 0) {
                temp = recentCurriculum[0]['regDate'];
                inx = 0;
            }
            if (recentFreeboard.length > 0) {
                if (!temp) {
                    temp = recentFreeboard[0]['regdate'];
                } else if (temp < recentFreeboard[0]['regDate']) {
                    temp = recentFreeboard[0]['regDate'];
                    inx = 1;
                }
            }
            if (recentQNA.length > 0) {
                if (!temp) {
                    temp = recentQNA[0]['regdate'];
                } else if (temp < recentQNA[0]['regDate']) {
                    temp = recentQNA[0]['regDate'];
                    inx = 2;
                }
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
export async function getFreeboard(req: Request, res: Response) {
    const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
    const freeboardIds: [string] = boardWrap['freeboard'];
    const numTotalBoards = freeboardIds.length;
    const totalPages = Math.ceil(numTotalBoards / boardPerPage);
    const currentPage = Number(req.query.currentPage) + 1;
    if (freeboardIds) {
        let freeboards = [];
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
        for (const id of freeboardIds.slice(start, end).reverse()) {
            const freeboard = await FreeBoardSchema.findById({ _id: id });
            freeboards = [
                ...freeboards,
                {
                    title: freeboard['title'],
                    type: freeboard['type'],
                    _id: freeboard['_id'],
                    regUser: freeboard['regUser'],
                    regDate: freeboard['regDate'],
                },
            ];
        }
        const result = {
            totalPages: totalPages,
            freeboards,
        };
        return res.json(result);
    } else {
        return res.json({
            code: 500,
            message: 'freeboardIds not found',
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
export async function getFreeboardDetail(req: Request, res: Response) {
    const detail = await FreeBoardSchema.findById({ _id: req.params['id'] });
    const { plus, minus } = await classifyLikeHate(detail['likes']);
    const result = {
        _id: detail['_id'],
        title: detail['title'],
        content: detail['content'],
        type: detail['type'],
        regUser: detail['regUser'],
        regDate: detail['regDate'],
        like: plus,
        hate: minus,
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
export async function createFreeboard(req: Request, res: Response) {
    if (req.body) {
        const document = {
            title: req.body['title'],
            content: req.body['content'],
            regUser: '6044e99159adab64c4d10263',
            type: req.params['type'],
        };
        const freeboard = await FreeBoardSchema.create(document);
        if (!freeboard) {
            return res.json({
                code: 500,
                message: 'Freeboard Document Creation Failed',
            });
        }
        const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
        if (boardWrap) {
            boardWrap['freeboard'].push(freeboard._id);
            await BoardWrapSchema.updateOne({ type: req.params['type'] }, boardWrap);
            return res.json({
                code: 200,
                message: 'Success',
            });
        } else {
            const newBoardWrap = {
                freeboard: [freeboard._id],
                type: req.params['type'],
            };
            BoardWrapSchema.create(newBoardWrap);
            return res.json({
                code: 200,
                message: 'Success',
            });
        }
    } else {
        return res.json({
            code: 500,
            message: 'Body for create from request is missing',
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
export async function updateFreeboard(req: Request, res: Response) {
    if (req.body) {
        const freeboard = await FreeBoardSchema.findById({ _id: req.params['id'] });
        freeboard['title'] = req.body['title'];
        freeboard['content'] = req.body['content'];
        await FreeBoardSchema.findByIdAndUpdate({ _id: req.params['id'] }, freeboard);
        return res.json({
            code: 200,
            message: 'Success',
        });
    } else {
        res.json({
            code: 500,
            message: 'Body for update from require is missing',
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
export async function deleteFreeboard(req: Request, res: Response) {
    await FreeBoardSchema.findByIdAndDelete({ _id: req.params['id'] });
    const boardWrap = await BoardWrapSchema.findOne({ type: req.params['type'] });
    const freeboardIds: [string] = boardWrap['freeboard'];
    freeboardIds.splice(freeboardIds.indexOf(req.params['id']), 1);
    boardWrap['freeboard'] = freeboardIds;
    await BoardWrapSchema.updateOne({ type: req.params['type'] }, boardWrap);
    return res.json({
        code: 200,
        message: 'Success',
    });
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
