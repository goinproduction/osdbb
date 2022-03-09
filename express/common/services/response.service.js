"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
function responseHandler(res, statusCode, message, object) {
    return res.status(statusCode).json({
        data: object,
        message
    });
}
exports.responseHandler = responseHandler;
//# sourceMappingURL=response.service.js.map