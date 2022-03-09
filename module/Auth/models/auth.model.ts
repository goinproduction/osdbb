import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const authSchema = new Schema({
    username: {
        type: String
    },
    passwords: {
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
        type: String,
        default: "USER"
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
    }
})

const Auth = mongoose.model('Auth', authSchema);

export default Auth;