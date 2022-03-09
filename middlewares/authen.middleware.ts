import { responseHandler } from '../common/service/response.service';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import StaticStringKeys from '../common/constant/constant'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        responseHandler(res, 403, StaticStringKeys.UNAUTHORIZED)
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
        req.user = decoded;
    } catch (err) {
        responseHandler(res, 401, StaticStringKeys.INVALID_TOKEN)
    }
    return next();
};