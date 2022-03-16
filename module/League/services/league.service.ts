import { LeagueDto } from './../DTO/league.dto';
import League from '../models/league.model'
import Team from '../../Team/models/team.model'
import StaticStringKeys from '../../../common/constant/constant'
import { IDB, serializeGetLeague } from '../serializers/league.serializer'
import { IResponse } from '../../../common/service/response.service'
import {IDBTeam, serializeGetTeam} from '../../Team/serializers/team.serializer'

interface ILeagueService {
    getLeagues(): Promise<IResponse>;
    addLeague(data: LeagueDto): Promise<IResponse>;
    addTeamToLeague(id: string, teamId: string): Promise<IResponse>;
    deleteLeague(id: string): Promise<IResponse>;
    filterLeague(id: string): Promise<IResponse>;
}

export default class LeagueService implements ILeagueService {
    public async getLeagues() {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                const data = await League.find().exec();
                if (data) {
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'All leagues has been fetched successfully',
                        success: true,
                        data: data.map((d: IDB) => serializeGetLeague(d))
                    }
                    resolve(response);
                }
                const error: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    public async addLeague(data: LeagueDto) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                // Check whether lg_name is existed or not?
                const isExisted = await League.findOne({ lg_name: data.lg_name }).exec()
                if (isExisted) {
                    const error: IResponse = {
                        statusCode: 403,
                        message: 'League has already existed',
                        success: false
                    }
                    resolve(error)
                }
                const newLeague = new League({
                    lg_name: data.lg_name,
                    lg_teams: data.lg_teams
                })
                if (await newLeague.save()) {
                    const success: IResponse = {
                        statusCode: 201,
                        message: 'League has been created successfully',
                        success: true
                    }
                    resolve(success)
                }
                const fail: IResponse = {
                    statusCode: 400,
                    message: StaticStringKeys.BAD_REQUEST,
                    success: false
                }
                resolve(fail)
            } catch (error) {
                reject(error)
            }
        })
    }

    public async addTeamToLeague(id: string, teamId: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                // Check exist
                const isLeagueExisted = await League.findOne({ _id: id }).exec();
                if (isLeagueExisted) {
                    // Dummy logic here
                    const lg_teams = isLeagueExisted.lg_teams
                    lg_teams.push(teamId)
                    // Update
                    const data = await League.findOneAndUpdate({ _id: id }, { lg_teams }, { new: true });
                    const response: IResponse = {
                        statusCode: 202,
                        success: true,
                        message: 'Team of league has been updated successfully',
                        data: serializeGetLeague(data)
                    }
                    resolve(response)
                }
                const fail: IResponse = {
                    statusCode: 404,
                    message: StaticStringKeys.NOT_FOUND,
                    success: false
                }
                resolve(fail)
            } catch (error) {
                reject(error)
            }
        })
    }

    public async deleteLeague(id: string) {
        return new Promise<IResponse>(async (resolve, reject) => {
            try {
                // Check whether the leagueId is valid
                const isValidId = await League.findOne({ _id: id }).exec();
                if (isValidId) {
                    await League.findOneAndDelete({ _id: id }).exec();
                    const response: IResponse = {
                        statusCode: 200,
                        message: 'League has been deleted successfully',
                        success: true
                    }
                    resolve(response)
                }
                const error: IResponse = {
                    statusCode: 404,
                    message: 'League does not match with any result',
                    success: false
                }
                resolve(error)
            } catch (error) {
                reject(error)
            }
        })
    }

    public async filterLeague(leagueId: string) {
        return new Promise<IResponse> (async (resolve, reject) => {
            try {
                const league = await League.findOne({_id: leagueId}).exec();

                if(league) {
                    const teamIds = league.lg_teams;

                    const teams: IDBTeam[] = [];

                    for(var i in teamIds) {
                        const team = await Team.findOne({_id: teamIds[i]}).exec();
                        teams.push(team);
                    }

                    const response: IResponse = {
                        statusCode: 200,
                        message: 'Filter League successfully!',
                        success: true,
                        data: teams.map((team: IDBTeam) => serializeGetTeam(team))
                    }

                    resolve(response);
                } else {
                    const error: IResponse = {
                        statusCode: 404,
                        message: 'League does not match with any result',
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