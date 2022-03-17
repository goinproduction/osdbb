import { PlayerDto } from './../DTOs/player.dto';
import StaticStringKeys from '../../../common/constant/constant'
import { IResponse } from '../../../common/service/response.service'
import Player from '../models/player.model'
import { IDB, serializeGetPlayer } from '../serializers/player.serializer';

interface IPlayerService {
    createPlayer(data: PlayerDto): Promise<IResponse>,
    getPlayer(id: string): Promise<IResponse>,
    getAllPlayer(): Promise<IResponse>,
    updatePlayer(id: string, data: PlayerDto): Promise<IResponse>,
    deletePlayer(id: string): Promise<IResponse>,
}

export default class PlayerService implements IPlayerService {
    public async createPlayer(data: PlayerDto) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                // check player_name or player_number is exist or not?
                const existingPlayerName = await Player.findOne({player_name: data.player_name}).exec();
                const existingPlayerNumber = await Player.findOne({player_number: data.player_number}).exec();

                if(existingPlayerName || existingPlayerNumber) {
                    const error: IResponse = {
                        statusCode: 400,
                        message: "Player's name or Player's number has already existed",
                        success: false
                    }

                    resolve(error);
                } else {
                    const newPlayer = new Player({
                        player_name: data.player_name,
                        player_number: data.player_number,
                        player_avatar: StaticStringKeys.BASE_URL + data.player_avatar.path.replace(/\\/g, '/'),
                        // player_avatar: data.player_avatar,
                        player_position: data.player_position
                    })

                    await newPlayer.save();

                    const response: IResponse = {
                        success: true,
                        statusCode: 200,
                        message: 'New Player has been created successfully!',
                    }

                    resolve(response);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public async getPlayer(id: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const player = await Player.findOne({_id: id}).exec();

                if(player) {
                    const response:IResponse = {
                        statusCode: 200,
                        message: 'Fetched player information successfully!',
                        success: true,
                        data: {
                            player: serializeGetPlayer(player) 
                        }
                    }

                    resolve(response)
                } else {
                    const error:IResponse = {
                        statusCode: 404,
                        message: StaticStringKeys.NOT_FOUND,
                        success: false
                    }

                    resolve(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public async getAllPlayer() {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const players = await Player.find().exec();

                if(players) {
                    const response:IResponse = {
                        statusCode: 200,
                        message: 'Fetched all player information successfully!',
                        success: true,
                        data: {
                            playerList: players.map((player: IDB) => serializeGetPlayer(player))
                        }
                    }

                    resolve(response);
                } else {
                    const error:IResponse = {
                        statusCode: 404,
                        message: StaticStringKeys.NOT_FOUND,
                        success: false
                    }

                    resolve(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public async updatePlayer(id: string, data: PlayerDto) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const player = await Player.findOne({_id: id}).exec();

                if(player) {
                    data.player_avatar = data.player_avatar ? StaticStringKeys.BASE_URL + data.player_avatar.path.replace(/\\/g, '/') 
                        : player.player_avatar;

                    const dataUpdate = {
                        player_name: data.player_name || player.player_name,
                        player_number: data.player_number || player.player_number,
                        player_avatar: data.player_avatar,
                        player_position: data.player_position || player.player_position
                    }
                    const update = await Player.findOneAndUpdate({_id: id}, dataUpdate, {new: true});
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Updated player information successfully!',
                        success: true,
                        data: serializeGetPlayer(update)
                    }

                    resolve(response);
                } else {
                    const error: IResponse = {
                        statusCode: 404,
                        message: StaticStringKeys.NOT_FOUND,
                        success: false
                    }

                    resolve(error);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    public async deletePlayer(id: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const player = await Player.findOne({_id: id}).exec();

                if(player) {
                    await Player.deleteOne({_id: id}).exec();

                    const response:IResponse = {
                        statusCode: 200,
                        message: 'Deleted player successfully!',
                        success: true,
                    }

                    resolve(response);
                } else {
                    const error: IResponse = {
                        statusCode: 404,
                        message: StaticStringKeys.NOT_FOUND,
                        success: false
                    }

                    resolve(error);
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}