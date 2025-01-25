"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);
    if (err?.extensions?.code === "UNAUTHORIZED") {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(err);
    }
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = 400;
    }
    return res.status(customError.statusCode).json({ message: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
