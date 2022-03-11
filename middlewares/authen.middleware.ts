import { responseHandler } from '../common/service/response.service';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import StaticStringKeys from '../common/constant/constant'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    let token = (req.headers.authorization as string)?.split(' ')[1];

    if (!token) {
        responseHandler(res, 403, StaticStringKeys.UNAUTHORIZED)
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, decoded) => {
            if (error) {
                responseHandler(res, 401, StaticStringKeys.INVALID_TOKEN)
            } else {
                res.locals.jwt = decoded
                next()
            }
        })
    }
};