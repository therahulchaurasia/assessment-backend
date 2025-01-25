"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const connectDB = () => {
    return mongoose.connect(MONGO_URI);
};
exports.default = connectDB;
