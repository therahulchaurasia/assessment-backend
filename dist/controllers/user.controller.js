"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const http_status_codes_1 = require("http-status-codes");
const getMe = async (req, res) => {
    const user = req.user;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user,
    });
};
exports.getMe = getMe;
