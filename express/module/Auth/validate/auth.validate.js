"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserValidation {
    constructor() {
        this.registerSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            username: joi_1.default.string().min(1).required(),
            password: joi_1.default.string().min(5).required(),
            full_name: joi_1.default.string().required(),
            phone_number: joi_1.default.number().required()
        });
        this.loginSchema = joi_1.default.object({
            username: joi_1.default.string().required(),
            password: joi_1.default.string().required()
        });
    }
}
exports.default = UserValidation;
//# sourceMappingURL=auth.validate.js.map