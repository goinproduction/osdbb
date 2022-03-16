import LeagueService from "../services/league.service"
import { Request, response, Response } from "express"
import StaticStringKeys from '../../../common/constant/constant'
import { LeagueDto } from '../DTO/league.dto'
import { responseHandler } from '../../../common/service/response.service'

export default class LeagueController extends LeagueService {
    handleGetAllLeagues = async (req: Request, res: Response) => {
        try {
            const object = await this.getLeagues();
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data)
            } else {
                responseHandler(res, object.statusCode, object.message)
            }
        } catch (error) {
            console.log(error)
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR)
        }
    }

    handleAddLeague = async (req: Request, res: Response) => {
        try {
            const data: LeagueDto = {
                lg_name: req.body.lg_name,
                lg_teams: req.body.lg_teams
            }
            const object = await this.addLeague(data);
            responseHandler(res, object.statusCode, object.message);
        } catch (error) {
            console.log(error)
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR)
        }
    }

    handleDeleteLeague = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const object = await this.deleteLeague(id);
            responseHandler(res, object.statusCode, object.message);
        } catch (error) {
            console.log(error)
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR)
        }
    }

    handleAddTeamToLeague = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id as string;
            const teamId: string = req.body.teamId;
            const object = await this.addTeamToLeague(id, teamId);
            if (object.success) {
                responseHandler(res, object.statusCode, object.message, object.data);
            } else {
                responseHandler(res, object.statusCode, object.message);
            }
        } catch (error) {
            console.log(error)
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR)
        }
    }

    handleFilterLeague = async (req: Request, res: Response) => {
        try {
            const leagueId = req.params.id;

            const object = await this.filterLeague(leagueId);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data)
                : responseHandler(res, object.statusCode, object.message, object.data);
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
    }
}