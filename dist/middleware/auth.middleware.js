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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new Error("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield user_model_1.User.findOne({ _id: payload._id });
        if (!user)
            throw new Error("Authentication invalid");
        const MyRequestUser = {
            _id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        req.user = MyRequestUser;
        next();
    }
    catch (error) {
        throw new Error("Authentication invalid");
    }
});
exports.authMiddleware = authMiddleware;
