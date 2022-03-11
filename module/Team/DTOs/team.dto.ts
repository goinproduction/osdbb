export interface CreateTeamDto {
    team_name: string,
    logo: any,
    player_list: Array<object>
}

export interface UpdateTeamDto {
    team_name?: string,
    logo?: any,
    player_list?: Array<object>
}