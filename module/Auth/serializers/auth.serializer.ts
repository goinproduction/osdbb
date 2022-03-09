interface IDB {
    _id: string,
    username: string,
    password: string,
    full_name: string,
    phone_number: number,
    avatar: string,
    role: string,
    win?: number,
    lose: number,
    win_rate: number,
    dept: number,
    token: string
}

interface IUser {
    userId: string,
    username: string,
    password: string,
    full_name: string,
    phone_number: number,
    avatar: string,
    role: string,
    win?: number,
    lose: number,
    win_rate: number,
    dept: number,
    token?: string
}

export function serializeGetUser(model: IDB): IUser {
    return {
        userId: model._id,
        username: model.username,
        password: model.password,
        full_name: model.full_name,
        phone_number: model.phone_number,
        token: model.token,
        avatar: model.avatar,
        role: model.role,
        win: model.win,
        lose: model.lose,
        win_rate: model.win_rate,
        dept: model.dept,
    }
}