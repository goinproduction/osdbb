import express from 'express';
import AuthController from '../controllers/auth.controller';
import { registerValidation, loginValidation, updateValidation } from '../../../middlewares/validatebody.middleware'
import { verifyToken } from '../../../middlewares/authen.middleware'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname);
    }
})

const upload = multer({
    storage
});

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/auth/register', registerValidation, authController.handleRegister);
authRouter.post('/auth/login', loginValidation, authController.handleLogin);
authRouter.get('/user/:id', verifyToken, authController.handleGetUser)
authRouter.get('/user', verifyToken, authController.handleGetUsers)
authRouter.put('/user/:id', [verifyToken, updateValidation, upload.single('avatar')], authController.handleUpdateUser)
authRouter.delete('/user/:id', verifyToken, authController.handleDeleteUser)

export default authRouter;