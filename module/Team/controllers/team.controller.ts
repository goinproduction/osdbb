import { Request, Response } from "express";

import { TeamDto } from './../DTOs/team.dto';
import TeamService from "../services/team.service";
import { responseHandler } from '../../../common/service/response.service'
import StaticStringKeys from "../../../common/constant/constant";

export default class TeamController extends TeamService {
    handleCreateTeam = async (req: Request, res: Response) => {
        try {
            const data: TeamDto = {
                team_name: req.body.team_name,
                logo: req.file,
                player_list: req.body.player_list
            };

            const object = await this.createTeam(data);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetTeam = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;

            const object = await this.getTeam(id);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetAllTeam = async (req: Request, res: Response) => {
        try {
            const object = await this.getAllTeam();

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleUpdateTeam = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const data: TeamDto = {
                team_name: req.body.team_name,
                logo: req.file,
                player_list: req.body.player_list
            }

            const object = await this.updateTeam(id, data);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleDeleteTeam = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const object = await this.deleteTeam(id);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
}