"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGetUser = void 0;
function serializeGetUser(model) {
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
    };
}
exports.serializeGetUser = serializeGetUser;
//# sourceMappingURL=auth.serializer.js.map