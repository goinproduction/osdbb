import { Request, Response } from 'express'
import { responseHandler } from '../../../common/service/response.service'
import AuthService from '../services/auth.service'
import { SignUpDto } from '../DTO/auth.dto'
import StaticStringKeys from '../../../common/constant/constant'

export default class AuthController {
    public AuthService: AuthService = new AuthService();
    handleRegister = async (req: Request, res: Response) => {
        try {
            const data: SignUpDto = {
                username: req.body.username,
                password: req.body.password,
                full_name: req.body.full_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
            };
            const object = await this.AuthService.register(data);
            if (object.success) {
                responseHandler(res, 201, object.message, object.data);
            } else {
                responseHandler(res, 403, object.message);
            }
        } catch (error) {
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
}