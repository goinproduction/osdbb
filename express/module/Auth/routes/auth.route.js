"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validatebody_middleware_1 = require("../../../middlewares/validatebody.middleware");
const authRouter = express_1.default.Router();
const authController = new auth_controller_1.default();
authRouter.post('/register', validatebody_middleware_1.registerValidation, authController.handleRegister);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map