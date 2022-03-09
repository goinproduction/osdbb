import UserValidation from '../module/Auth/validate/auth.validate'
import { Request, Response, NextFunction } from 'express'
import { responseHandler } from '../common/service/response.service'

const userValidation = new UserValidation();

export async function loginValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const validated = await userValidation.loginSchema.validateAsync(req.body)
        req.body = validated
        next()
    } catch (err) {
        responseHandler(res, 400, 'Invalid format, please try again!');
    }
}

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const validated = await userValidation.registerSchema.validateAsync(req.body)
        req.body = validated
        next()
    } catch (err) {
        responseHandler(res, 400, 'Invalid format, please try again!');
    }
}