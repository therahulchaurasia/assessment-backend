"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.loginUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user.model");
const index_1 = require("../errors/index");
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new index_1.BadRequestError("All fields are required");
    }
    const user = yield user_model_1.User.create({ name, email, password });
    const token = user.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        token,
    });
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new index_1.BadRequestError("Please provide email and password");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new index_1.NotFoundError("User not found");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new index_1.BadRequestError("Incorrect password");
    }
    // compare password
    const token = user.generateAuthToken();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        token,
    });
});
exports.loginUserController = loginUserController;
