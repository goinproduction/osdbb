"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = `mongodb+srv://betbb:${process.env.DB_PASSWORD}@cluster0.vi88l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const Connect = async () => {
    try {
        await mongoose_1.default.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database connected');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = Connect;
//# sourceMappingURL=connect.config.js.map