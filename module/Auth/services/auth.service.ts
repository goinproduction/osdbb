import { Document } from 'mongoose';
import jwt from 'jsonwebtoken'
import Auth from '../models/auth.model'
import bcrypt from 'bcrypt'
import { SignUpDto } from '../DTO/auth.dto'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

interface ISuccessResponse<T extends Document> {
    message: string,
    success: boolean,
    data?: object
}

interface IErrorResponse {
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

                // Check whether email is exist or not?
                const existingEmail = await Auth.findOne({ email: data.email }).exec();
                console.log(existingEmail);
                if (existingEmail) {
                    let error: IErrorResponse = {
                        message: 'Email has already existed',
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
                    message: 'User created successfully!',
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
