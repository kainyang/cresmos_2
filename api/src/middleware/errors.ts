import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (handler: RequestHandler) =>
    (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2]);

export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not found' });
}

export const internalServerError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) {
        console.error(err.stack)
    }

    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}
