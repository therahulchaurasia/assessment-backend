"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.loginUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user.model");
const index_1 = require("../errors/index");
const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new index_1.BadRequestError("All fields are required");
    }
    const user = await user_model_1.User.create({ name, email, password });
    const token = user.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        token,
    });
};
exports.registerUserController = registerUserController;
const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new index_1.BadRequestError("Please provide email and password");
    }
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        throw new index_1.NotFoundError("User not found");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new index_1.BadRequestError("Incorrect password");
    }
    // compare password
    const token = user.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        token,
    });
};
exports.loginUserController = loginUserController;
