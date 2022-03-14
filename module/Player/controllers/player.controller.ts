import { PlayerDto } from './../DTOs/player.dto';
import { Request, Response } from "express";
import StaticStringKeys from "../../../common/constant/constant";
import { responseHandler } from "../../../common/service/response.service";
import PlayerService from "../services/player.service";

 export default class PlayerController extends PlayerService {
     handleCreatePlayer = async (req: Request, res: Response) => {
        try {
            const data: PlayerDto = {
                player_name: req.body.player_name,
                player_number: req.body.player_number,
                player_avatar: req.file,
                player_position: req.body.player_position
            }

            const object = await this.createPlayer(data);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        }
     }

     handleGetPlayer = async (req: Request, res: Response) => {
         try {
             const id = req.params.id;
             const object = await this.getPlayer(id);

             object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
         } catch (error) {
             console.log(error);
             responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
         }
     }

     handleGetAllPlayer = async (req: Request, res: Response) => {
         try {
            const object = await this.getAllPlayer();
            
            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
         } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
         }
     }

     handleUpdatePlayer = async (req: Request, res: Response) => {
         try {
             const id = req.params.id;
             const data:PlayerDto = {
                player_name: req.body.player_name,
                player_number: req.body.player_number,
                player_avatar: req.file,
                player_position: req.body.player_position
             }

             const object = await this.updatePlayer(id, data);

             object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
         } catch (error) {
             console.log(error);
             responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
         }
     }

     handleDeletePlayer = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const object = await this.deletePlayer(id);

            object.success ? responseHandler(res, object.statusCode, object.message, object.data) 
                : responseHandler(res, object.statusCode, object.message)
        } catch (error) {
            console.log(error);
            responseHandler(res, 500, StaticStringKeys.INTERNAL_SERVER_ERROR, error);
        } 
     }
 }