export interface SignUpDto {
    username: string,
    password: string,
    full_name: string,
    phone_number: number,
    email: string
}

export interface SignInDto {
    username: string,
    password: string
}