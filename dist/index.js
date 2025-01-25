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
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./services/db"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("./middleware/error.middleware");
const mode = process.env.MODE;
const app = (0, express_1.default)();
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const auth_middleware_1 = require("./middleware/auth.middleware");
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
}));
mode === "dev" && app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Node.js + Express!");
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/my", user_route_1.default);
app.use('/api/v1/tasks', auth_middleware_1.authMiddleware, task_route_1.default);
app.use(error_middleware_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting to database...");
        yield (0, db_1.default)();
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
