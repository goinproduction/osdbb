import { TeamDto } from '../DTOs/team.dto'
import Team from '../models/team.model'
import StaticStringKeys from '../../../common/constant/constant'
import { IDBTeam, serializeGetTeam } from '../serializers/team.serializer'
import { IResponse } from '../../../common/service/response.service'
import { rejects } from 'assert'

interface ITeamService {
    createTeam(data: TeamDto): Promise<IResponse>,
    getTeam(id: string): Promise<IResponse>,
    getAllTeam(): Promise<IResponse>,
    updateTeam(id: string, data: TeamDto): Promise<IResponse>,
    deleteTeam(id: string): Promise<IResponse>,
    addPlayerToTeam(id: string, playerId: string): Promise<IResponse>,
    deletePlayerFromTeam(id: string, playerId: string): Promise<IResponse>,
}

export default class TeamService implements ITeamService {
    public async createTeam(data: TeamDto) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                // Check whether team_name is exists or not?
                const existingTeamName = await Team.findOne({team_name: data.team_name}).exec();

                if(existingTeamName) {
                    const error: IResponse = {
                        statusCode: 400,
                        message: 'Team name has already existed',
                        success: false
                    }

                    resolve(error);
                } else {
                    // All good
                    const newTeam = new Team({
                        team_name: data.team_name,
                        logo: StaticStringKeys.BASE_URL + data.logo.path.replace(/\\/g, '/'),
                        // logo: data.logo,
                        player_list: data.player_list
                    })

                    await newTeam.save();

                    const response: IResponse = {
                        statusCode: 200,
                        message: 'New team has been created successfully!',
                        success: true,
                    }
                    resolve(response);
                }
            } catch (error) {
                reject(error)
            }

        })
    }

    public async getTeam(id: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const team = await Team.findOne({_id: id}).exec();

                if(team) {
                    // All good
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Fetched team information successfully!',
                        success: true,
                        data: {
                            team: serializeGetTeam(team)
                        }
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

    public async getAllTeam() {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const data = await Team.find().exec();

                if(data) {
                    // All good
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Fetched all team information successfully!',
                        success: true,
                        data: {
                            teamList: data.map((item: IDBTeam) => serializeGetTeam(item))
                        }
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

    public async updateTeam(id: string, data: TeamDto) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const team = await Team.findOne({_id: id}).exec();

                if(team) {
                    data.logo = data.logo ? StaticStringKeys.BASE_URL + data.logo.path.replace(/\\/g, '/') : team.logo;

                    const filedUpdate = {
                        team_name: data.team_name || team.team_name,
                        logo: data.logo,
                        player_list: data.player_list || team.player_list
                    }
                    const update = await Team.findOneAndUpdate({_id: id}, filedUpdate, {new: true}).exec();
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Updated team information successfully!',
                        success: true,
                        data: serializeGetTeam(update)
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

    public async deleteTeam(id: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const team = await Team.findOne({_id: id}).exec();

                if(team) {
                    await Team.deleteOne({_id: id}).exec();

                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Deleted team successfully!',
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
                reject(error);
            }
        })
    }

    public async addPlayerToTeam(id: string, playerId: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const team = await Team.findOne({_id: id}).exec();

                if(team) {
                    const playerList = team.player_list;

                    if(playerList.includes(playerId)) {
                        const error: IResponse = {
                            statusCode: 404,
                            message: 'The player already exist in the team',
                            success: false
                        }
    
                        resolve(error);
                    } else {
                        playerList.push(playerId);

                        const update = await Team.findOneAndUpdate({_id: id}, {player_list: playerList}, {new: true}).exec();

                        const response: IResponse = {
                            statusCode: 200,
                            message: 'Added player to team successfully!',
                            success: true,
                            data: serializeGetTeam(update)
                        }

                        resolve(response);
                    }
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

    public async deletePlayerFromTeam(id: string, playerId: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const team = await Team.findOne({_id: id}).exec();

                if(team) {
                    const playerList = team.player_list;

                    for(var i in playerList) {
                        playerList[i] === playerId ? playerList.splice(i, 1) : playerList;
                    }

                    const update = await Team.findOneAndUpdate({_id: id}, {player_list: playerList}, {new: true});

                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Deleted player from team successfully!',
                        success: true,
                        data: serializeGetTeam(update)
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
}