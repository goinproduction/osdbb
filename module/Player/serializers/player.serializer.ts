export interface IDB {
    _id: string,
    player_name: string,
    player_number: number,
    player_avatar: string,
    player_position: string
}

export interface IPlayer {
    playerId: string,
    player_name: string,
    player_number: number,
    player_avatar: string,
    player_position: string
}

export function serializeGetPlayer(model: IDB):IPlayer {
    return {
        playerId: model._id,
        player_name: model.player_name,
        player_number: model.player_number,
        player_avatar: model.player_avatar,
        player_position: model.player_position
    }
}