import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import todo from '../models/todo.model';
import account from '../models/account.model';

export async function get(req: Request, res: Response) {
    const { id } = req.params;

    const userExist = await account.findOne({ _id: id });
    if (!userExist) return res.status(NOT_FOUND).json({ success: false, message: 'User is not found' });

    const todoExist = await todo.findOne({ userId: id });
    if (!todoExist) return res.status(OK).json({ success: false, message: 'Todo List is empty' });

    return res.status(OK).json({ success: true, data: todoExist.data });
}

export async function post(req: Request, res: Response) {
    const list = new todo({
        userId: req.body.userId,
        data: req.body.data
    });
    try {
        const savedPost = await list.save();
        return res.status(CREATED).json({
            success: true,
            listId: savedPost._id
        });
    } catch (err) {
        return res.status(BAD_REQUEST).json({ success: false, message: err });
    }
}

export async function update(req: Request, res: Response) {
    // const list = new todo({
    //     userId: req.body.userId,
    //     data: req.body.data
    // });
    // try {
    //     const savedPost = await list.findOne();
    //     return res.status(CREATED).json({
    //         success: true,
    //         listId: savedPost._id
    //     });
    // } catch (err) {
    //     return res.status(BAD_REQUEST).json({ success: false, message: err });
    // }
}