"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("../../module/Auth/routes/auth.route"));
const route = (app) => {
    app.use('/api/auth', auth_route_1.default);
};
exports.default = route;
//# sourceMappingURL=index.js.map