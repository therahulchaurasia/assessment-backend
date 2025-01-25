"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = require("../models/task.model");
const errors_1 = require("../errors");
const getTasks = async (req, res) => {
    const tasks = await task_model_1.Task.find({ createdBy: req.user._id });
    res.status(200).json({ tasks });
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    const { name, description, status } = req.body;
    if (!name || !description || !status) {
        throw new errors_1.BadRequestError("Please provide name description and status ");
    }
    const task = await task_model_1.Task.create({
        name,
        description,
        status,
        createdBy: req.user._id,
    });
    res.status(201).json({ task });
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const { newStatus } = req.body;
    const updatedTask = await task_model_1.Task.findByIdAndUpdate(req.params.id, {
        status: newStatus,
    }, { new: true });
    if (!updatedTask) {
        throw new errors_1.BadRequestError("No task found");
    }
    res.status(200).json({ task: updatedTask });
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    if (!req.params.id) {
        throw new errors_1.BadRequestError("Please provide a task id");
    }
    await task_model_1.Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
};
exports.deleteTask = deleteTask;
