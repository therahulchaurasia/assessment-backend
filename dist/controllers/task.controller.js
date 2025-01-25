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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = require("../models/task.model");
const errors_1 = require("../errors");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.Task.find({ createdBy: req.user._id });
    res.status(200).json({ tasks });
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status } = req.body;
    if (!name || !description || !status) {
        throw new errors_1.BadRequestError("Please provide name description and status ");
    }
    const task = yield task_model_1.Task.create({
        name,
        description,
        status,
        createdBy: req.user._id,
    });
    res.status(201).json({ task });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newStatus } = req.body;
    const updatedTask = yield task_model_1.Task.findByIdAndUpdate(req.params.id, {
        status: newStatus,
    }, { new: true });
    if (!updatedTask) {
        throw new errors_1.BadRequestError("No task found");
    }
    res.status(200).json({ task: updatedTask });
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        throw new errors_1.BadRequestError("Please provide a task id");
    }
    yield task_model_1.Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
});
exports.deleteTask = deleteTask;
