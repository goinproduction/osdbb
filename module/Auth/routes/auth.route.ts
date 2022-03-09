import express from 'express';
import AuthController from '../controllers/auth.controller';
import { registerValidation } from '../../../middlewares/validatebody.middleware'

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', registerValidation, authController.handleRegister);

export default authRouter;