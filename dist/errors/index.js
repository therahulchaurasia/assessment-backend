"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomAPIError extends Error {
    constructor(error) {
        super(error.message);
        this.statusCode = error.statusCode;
    }
}
class BadRequestError extends CustomAPIError {
    constructor(message) {
        super({ statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST, message });
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message });
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super({ statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED, message });
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ServerError extends CustomAPIError {
    constructor(message) {
        super({ statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
}
exports.ServerError = ServerError;
