import mongoose from 'mongoose'
const Schema = mongoose.Schema;
export enum ROLE_NAME {
    USER = "USER",
    ADMIN = "ADMIN"

}
const authSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    full_name: {
        type: String
    },
    phone_number: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://i.ibb.co/5sPszLQ/avatar.jpg'
    },
    role: {
        type: ROLE_NAME,
        default: ROLE_NAME.USER
    },
    win: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    win_rate: {
        type: Number,
        default: 0
    },
    dept: {
        type: Number,
        default: 0
    },
    email: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Auth = mongoose.model('Auth', authSchema);

export default Auth;