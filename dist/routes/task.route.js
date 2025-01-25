"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = require("../controllers/task.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route("/").get(task_controller_1.getTasks).post(task_controller_1.createTask);
router.route("/:id").patch(task_controller_1.updateTask).delete(task_controller_1.deleteTask);
exports.default = router;
