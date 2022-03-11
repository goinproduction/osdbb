export interface IDB {
    _id: string,
    team_name: string
    logo: string,
    player_list: Array<object>,
}

export interface ITeam {
    teamId: string,
    team_name: string,
    logo: string,
    player_list: Array<object>,
}

export function serializeGetTeam(model: IDB): ITeam {
    return {
        teamId: model._id,
        team_name: model.team_name,
        logo: model.logo,
        player_list: model.player_list
    }
}