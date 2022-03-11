export interface IDB {
    _id: string,
    lg_name: string
    lg_teams: Array<string>
}

export interface ILeague {
    league_id: string,
    lg_name: string,
    lg_teams: Array<string>
}

export function serializeGetLeague(model: IDB): ILeague {
    return {
        league_id: model._id,
        lg_name: model.lg_name,
        lg_teams: model.lg_teams
    }
}