export interface SignUpDto {
    username: string,
    password: string,
    full_name: string,
    phone_number: string,
    email: string
}

export interface SignInDto {
    username: string,
    password: string
}

export interface UpdateUserDto {
    full_name: string
    phone_number: string,
    avatar: any
}

export interface SignInGoogle {
    username: string,
    full_name: string,
    email: string,
    avatar: any
}