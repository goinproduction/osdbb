"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_service_1 = require("../../../common/service/response.service");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const constant_1 = __importDefault(require("../../../common/constant/constant"));
class AuthController {
    constructor() {
        this.AuthService = new auth_service_1.default();
        this.handleRegister = async (req, res) => {
            try {
                const data = {
                    username: req.body.username,
                    password: req.body.password,
                    full_name: req.body.full_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                };
                const object = await this.AuthService.register(data);
                if (object.success) {
                    (0, response_service_1.responseHandler)(res, 201, object.message, object.data);
                }
                else {
                    (0, response_service_1.responseHandler)(res, 403, object.message);
                }
            }
            catch (error) {
                (0, response_service_1.responseHandler)(res, 500, constant_1.default.INTERNAL_SERVER_ERROR, error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map