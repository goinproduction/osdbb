"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const auth_validate_1 = __importDefault(require("../module/Auth/validate/auth.validate"));
const response_service_1 = require("../common/service/response.service");
const userValidation = new auth_validate_1.default();
async function loginValidation(req, res, next) {
    try {
        const validated = await userValidation.loginSchema.validateAsync(req.body);
        req.body = validated;
        next();
    }
    catch (err) {
        (0, response_service_1.responseHandler)(res, 400, 'Invalid format, please try again!');
    }
}
exports.loginValidation = loginValidation;
async function registerValidation(req, res, next) {
    try {
        const validated = await userValidation.registerSchema.validateAsync(req.body);
        req.body = validated;
        next();
    }
    catch (err) {
        (0, response_service_1.responseHandler)(res, 400, 'Invalid format, please try again!');
    }
}
exports.registerValidation = registerValidation;
//# sourceMappingURL=validatebody.middleware.js.map