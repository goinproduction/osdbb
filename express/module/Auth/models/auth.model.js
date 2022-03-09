"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
const Auth = mongoose_1.default.model('Auth', authSchema);
exports.default = Auth;
//# sourceMappingURL=auth.model.js.map