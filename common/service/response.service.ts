import { Response } from 'express'

export function responseHandler(res: Response, statusCode: number, message: string, object?: any) {
    return res.status(statusCode).json({
        data: object,
        message
    })
}