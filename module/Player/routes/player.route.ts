import express from 'express'
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import PlayerController from '../controllers/player.controller';
import { verifyToken } from '../../../middlewares/authen.middleware';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname);
    }
})

const upload = multer({
    storage
});

const playerRouter = express.Router();
const playerController = new PlayerController();

playerRouter.post('/', [verifyToken, upload.single('player_avatar')], playerController.handleCreatePlayer);
playerRouter.get('/:id', verifyToken, playerController.handleGetPlayer);
playerRouter.get('/', verifyToken, playerController.handleGetAllPlayer);
playerRouter.put('/:id', [verifyToken, upload.single('player_avatar')], playerController.handleUpdatePlayer);
playerRouter.delete('/:id', verifyToken, playerController.handleDeletePlayer);

export default playerRouter