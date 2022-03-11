import { Response } from 'express'

export interface IResponse {
    statusCode: number,
    message: string,
    success: boolean,
    data?: object
}

export function responseHandler(res: Response, statusCode: number, message: string, object?: any) {
    return res.status(statusCode).json({
        data: object,
        message
    })
}