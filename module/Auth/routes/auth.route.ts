import express from 'express';
import AuthController from '../controllers/auth.controller';
import { registerValidation, loginValidation, updateValidation } from '../../../middlewares/validatebody.middleware'
import { verifyToken } from '../../../middlewares/authen.middleware'
import upload from '../../../middlewares/upload.middleware'

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/auth/register', registerValidation, authController.handleRegister);
authRouter.post('/auth/login', loginValidation, authController.handleLogin);
authRouter.get('/user/:id', verifyToken, authController.handleGetUser)
authRouter.get('/user', verifyToken, authController.handleGetAllUsers)
authRouter.put('/user/:id', [verifyToken, updateValidation, upload.single('avatar')], authController.handleUpdateUser)
authRouter.delete('/user/:id', verifyToken, authController.handleDeleteUser)
authRouter.put('/user/:id/activate', authController.handleActivateUser)
export default authRouter;