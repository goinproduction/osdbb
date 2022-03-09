import { Document } from 'mongoose';
import jwt from 'jsonwebtoken'
import Auth from '../models/auth.model'
import bcrypt from 'bcrypt'
import { SignUpDto, SignInDto } from '../DTO/auth.dto'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

interface ISuccessResponse<T extends Document> {
    statusCode: number,
    message: string,
    success: boolean,
    data?: object
}

interface IErrorResponse {
    statusCode: number,
    message: string,
    success: boolean,
}

interface IAuthService {

}

export default class AuthService implements IAuthService {

    public async register(data: SignUpDto) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const hashedPassword = bcrypt.hashSync(data.password, salt);
                // Check whether email or username is exist or not?
                const existingEmail = await Auth.findOne({ email: data.email }).exec();
                const existingUsername = await Auth.findOne({ username: data.username }).exec();
                if (existingEmail || existingUsername) {
                    let error: IErrorResponse = {
                        statusCode: 400,
                        message: 'Email or username has already existed',
                        success: false
                    }
                    resolve(error);
                }

                // All good 
                const newUser = new Auth({
                    username: data.username,
                    password: hashedPassword,
                    full_name: data.full_name,
                    phone_number: data.phone_number,
                    email: data.email
                })

                await newUser.save();

                const token = jwt.sign({
                    userId: newUser._id,
                }, process.env.ACCESS_TOKEN_SECRET || '');

                const response: ISuccessResponse<Document> = {
                    success: true,
                    statusCode: 201,
                    message: 'Account has been created successfully!',
                    data: {
                        token
                    }
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async login(data: SignInDto) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const user = await Auth.findOne({ username: data.username });

                // Check whether email is exist or not?
                if (!user) {
                    let error: IErrorResponse = {
                        statusCode: 400,
                        message: 'Incorrect username or password',
                        success: false
                    }
                    resolve(error);
                }

                const isValidPassword = bcrypt.compareSync(data.password, user.password);

                // Check whether password is correct or not?
                if (!isValidPassword) {
                    let error: IErrorResponse = {
                        statusCode: 400,
                        message: 'Incorrect username or password',
                        success: false
                    }
                    resolve(error);
                }

                // All good
                const token = jwt.sign({
                    userId: user._id,
                }, process.env.ACCESS_TOKEN_SECRET || '');

                const response: ISuccessResponse<Document> = {
                    success: true,
                    statusCode: 200,
                    message: 'User has been logged in successfully',
                    data: {
                        token
                    }
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
}
