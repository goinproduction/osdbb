import { Request, Response } from "express";

import { CreateTeamDto, UpdateTeamDto } from './../DTOs/team.dto';
import TeamService from "../services/team.service";
import { responseHandler } from '../../../common/service/response.service'
import StaticStringKeys from "../../../common/constant/constant";

export default class TeamController extends TeamService {
    handleCreateTeam = async (req: Request, res: Response) => {
        try {
            const data: CreateTeamDto = {
                team_name: req.body.team_name,
                logo: req.file,
                player_list: req.body.player_list
            };

            const object = await this.createTeam(data);

            if(object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetTeam = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;

            const object = await this.getTeam(id);

            if(object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleGetAllTeam = async (req: Request, res: Response) => {
        try {
            const object = await this.getAllTeam();

            if(object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }

    handleUpdateTeam = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const data: CreateTeamDto = {
                team_name: req.body.team_name,
                logo: req.file,
                player_list: req.body.player_list
            }

            // const data: CreateTeamDto = req.body;

            const object = await this.updateTeam(id, data);

            if(object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
}