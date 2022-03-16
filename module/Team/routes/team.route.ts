import express from 'express';
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

import TeamController from '../controllers/team.controller';
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

const teamRouter = express.Router();
const teamController = new TeamController();

teamRouter.post('/', [verifyToken, upload.single('logo')], teamController.handleCreateTeam);
teamRouter.get('/:id', verifyToken, teamController.handleGetTeam);
teamRouter.get('/', verifyToken, teamController.handleGetAllTeam);
teamRouter.put('/:id', [verifyToken, upload.single('logo')], teamController.handleUpdateTeam);
teamRouter.delete('/:id', verifyToken, teamController.handleDeleteTeam);
teamRouter.post('/:id/addPlayer', verifyToken, teamController.handleAddPlayerToTeam);
teamRouter.post('/:id/deletePlayer', verifyToken, teamController.handleDeletePlayerFromTeam);

export default teamRouter;