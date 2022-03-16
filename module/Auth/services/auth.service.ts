import jwt from 'jsonwebtoken'
import Auth from '../models/auth.model'
import bcrypt from 'bcrypt'
import { SignUpDto, SignInDto, UpdateUserDto, SignInGoogle } from '../DTO/auth.dto'
import { IDB, serializeGetUser } from '../serializers/auth.serializer'
import StaticStringKeys from '../../../common/constant/constant'
import { IResponse } from '../../../common/service/response.service'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

interface IAuthService {
    register(data: SignUpDto): Promise<IResponse>;
    login(data: SignInDto): Promise<IResponse>;
    loginGoogle(data: SignInGoogle): Promise<IResponse>;
    getUser(id: string): Promise<IResponse>;
    getAllUsers(): Promise<IResponse>;
    updateUser(id: string, data: UpdateUserDto): Promise<IResponse>;
    deleteUser(id: string): Promise<IResponse>;
    activateUser(id: string): Promise<IResponse>;
    updateUserDept(id: string, amount: number): Promise<IResponse>;
}

export default class AuthService implements IAuthService {

    public async register(data: SignUpDto) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const hashedPassword = bcrypt.hashSync(data.password, salt);
                // Check whether email or username is exists or not?
                const existingEmail = await Auth.findOne({ email: data.email }).exec();
                const existingUsername = await Auth.findOne({ username: data.username }).exec();
                if (existingEmail || existingUsername) {
                    let error: IResponse = {
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
                }, process.env.ACCESS_TOKEN_SECRET as string);

                const response: IResponse = {
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

    public async loginGoogle(data: SignInGoogle) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const exsitingEmail = await Auth.findOne({email: data.email}).exec();
                const exsitingName = await Auth.findOne({username: data.username}).exec();

                if(exsitingEmail || exsitingName) {
                    let error: IResponse = {
                        statusCode: 400,
                        message: 'Email or username has already existed',
                        success: false
                    }

                    resolve(error);
                } else {
                    // All good
                    const newUser = new Auth({
                        username: data.username,
                        full_name: data.full_name,
                        email: data.email,
                        avatar: data.avatar
                    })

                    await newUser.save();

                    const token = jwt.sign({
                        userId: newUser._id,
                    }, process.env.ACCESS_TOKEN_SECRET as string);

                    const user = await Auth.findOne({email: data.email}).exec();

                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'Account has been created successfully!',
                        data: {
                            token,
                            user: serializeGetUser(user)
                        }
                    }
                    
                    resolve(response);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public async login(data: SignInDto) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const user = await Auth.findOne({ username: data.username }).exec();

                // Check whether email is exist or not?
                if (!user) {
                    let error: IResponse = {
                        statusCode: 400,
                        message: 'Incorrect username or password',
                        success: false
                    }
                    resolve(error);
                }

                const isValidPassword = bcrypt.compareSync(data.password, user.password);

                // Check whether password is correct or not?
                if (!isValidPassword) {
                    let error: IResponse = {
                        statusCode: 400,
                        message: 'Incorrect username or password',
                        success: false
                    }
                    resolve(error);
                }

                // All good
                const token = jwt.sign({
                    userId: user._id,
                }, process.env.ACCESS_TOKEN_SECRET as string);

                const response: IResponse = {
                    success: true,
                    statusCode: 200,
                    message: 'User has been logged in successfully',
                    data: {
                        token,
                        user: serializeGetUser(user)
                    }
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async getUser(id: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const data = await Auth.findOne({ _id: id }).exec();
                if (!data) {
                    let error: IResponse = {
                        statusCode: 404,
                        message: StaticStringKeys.NOT_FOUND,
                        success: false
                    }
                    resolve(error);
                }

                // All good
                const response: IResponse = {
                    success: true,
                    statusCode: 200,
                    message: 'Fetched user information successfully!',
                    data: {
                        user: serializeGetUser(data)
                    }
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async getAllUsers() {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const data = await Auth.find().exec();
                if (data) {
                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'Success!!!',
                        data: {
                            userLst: data.map((d: IDB) => serializeGetUser(d))
                        }
                    }
                    resolve(response);
                }
                let error: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async updateUser(id: string, data: UpdateUserDto) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const rst = await Auth.findOne({ _id: id }).exec();
                if (rst) {
                    const fieldUpdate = {
                        full_name: data.full_name,
                        phone_number: data.phone_number,
                        avatar: StaticStringKeys.BASE_URL + data.avatar.path.replace(/\\/g, '/')
                    }
                    const update = await Auth.findOneAndUpdate({ _id: id }, fieldUpdate, { new: true });
                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'User information has been updated successfully!',
                        data: {
                            user: serializeGetUser(update)
                        }
                    }
                    resolve(response);
                }
                let error: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async deleteUser(id: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const user = await Auth.findOne({ _id: id }).exec();
                if (user) {
                    await Auth.findOneAndDelete({ _id: id }).exec();
                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'Account has been deleted successfully!',
                    }
                    resolve(response);
                }
                let error: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async activateUser(id: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const user = await Auth.findOne({ _id: id }).exec();
                if (user) {
                    await Auth.findOneAndUpdate({ _id: id }, { active: true }).exec();
                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'User has been activated successfully!',
                    }
                    resolve(response);
                }
                let error: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async updateUserDept(id: string, amount: number) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                // Check whether user existed or not?
                const isExisted = await Auth.findOne({ _id: id }).exec();
                if (isExisted) {
                    const newDept = isExisted.dept + amount;
                    const update = await Auth.findOneAndUpdate({ _id: id }, { dept: newDept }, { new: true }).exec();
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'User dept has been updated successfully',
                        success: true,
                        data: serializeGetUser(update)
                    }
                    resolve(response)
                }
                const error: IResponse = {
                    statusCode: 404,
                    message: 'User does not exist, please try again!!!',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error)
            }
        })
    }
}
