"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const payload = { _id: user._id, email: user.email };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
    });
    return token;
};
UserSchema.methods.comparePassword = function (password) {
    const isPasswordMatch = bcrypt_1.default.compareSync(password, this.password);
    return isPasswordMatch;
};
UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt_1.default.hashSync(this.password, 10);
    }
    next();
});
exports.User = mongoose_1.default.model("User", UserSchema);
