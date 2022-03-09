"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const salt = bcrypt_1.default.genSaltSync(saltRounds);
class AuthService {
    async register(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = bcrypt_1.default.hashSync(data.password, salt);
                const existingEmail = await auth_model_1.default.findOne({ email: data.email }).exec();
                console.log(existingEmail);
                if (existingEmail) {
                    let error = {
                        message: 'Email has already existed',
                        success: false
                    };
                    resolve(error);
                }
                const newUser = new auth_model_1.default({
                    username: data.username,
                    password: hashedPassword,
                    full_name: data.full_name,
                    phone_number: data.phone_number,
                    email: data.email
                });
                await newUser.save();
                const token = jsonwebtoken_1.default.sign({
                    userId: newUser._id,
                }, process.env.ACCESS_TOKEN_SECRET || '');
                const response = {
                    success: true,
                    message: 'User created successfully!',
                    data: {
                        token
                    }
                };
                resolve(response);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map