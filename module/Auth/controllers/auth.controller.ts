import { Request, Response } from 'express'
import { responseHandler } from '../../../common/service/response.service'
import AuthService from '../services/auth.service'
import { SignUpDto, SignInDto, UpdateUserDto } from '../DTO/auth.dto'
import StaticStringKeys from '../../../common/constant/constant'

export default class AuthController extends AuthService {
    handleRegister = async (req: Request, res: Response) => {
        try {
            const data: SignUpDto = {
                username: req.body.username,
                password: req.body.password,
                full_name: req.body.full_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
            };
            const object = await this.register(data);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
    handleLogin = async (req: Request, res: Response) => {
        try {
            const data: SignInDto = {
                username: req.body.username,
                password: req.body.password
            }
            const object = await this.login(data);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const object = await this.getUser(id);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetAllUsers = async (req: Request, res: Response) => {
        try {
            const object = await this.getAllUsers();
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleUpdateUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const data: UpdateUserDto = {
                full_name: req.body.full_name,
                phone_number: req.body.phone_number,
                avatar: req.file
            }
            const object = await this.updateUser(id, data);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
    handleDeleteUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const object = await this.deleteUser(id);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleActivateUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const object = await this.activateUser(id);
            responseHandler(res, object.statusCode, object.message);
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
}