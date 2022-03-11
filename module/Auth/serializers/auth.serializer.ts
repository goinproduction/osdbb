export interface IDB {
    _id: string,
    username: string,
    full_name: string,
    phone_number: string,
    avatar: string,
    role: string,
    win?: number,
    lose: number,
    win_rate: number,
    dept: number,
    token?: string
}

export interface IUser {
    userId: string,
    username: string,
    full_name: string,
    phone_number: string,
    avatar: string,
    role: string,
    win?: number,
    lose: number,
    win_rate: number,
    dept: number
}

export function serializeGetUser(model: IDB): IUser {
    return {
        userId: model._id,
        username: model.username,
        full_name: model.full_name,
        phone_number: model.phone_number,
        avatar: model.avatar,
        role: model.role,
        win: model.win,
        lose: model.lose,
        win_rate: model.win_rate,
        dept: model.dept
    }
}