import express from 'express';
import AuthController from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../../../middlewares/validatebody.middleware'
import { verifyToken } from '../../../middlewares/authen.middleware'
import { Request, Response, NextFunction } from 'express'

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', registerValidation, authController.handleRegister);
authRouter.post('/login', loginValidation, authController.handleLogin);
authRouter.get('/welcome', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ success: true })
});

export default authRouter;