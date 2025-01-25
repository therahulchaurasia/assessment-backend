import { Request, Response } from "express"
import { Task } from "../models/task.model"
import { BadRequestError } from "../errors"

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ createdBy: req.user._id })

  res.status(200).json({ tasks })
}

export const createTask = async (req: Request, res: Response) => {
  const { name, description, status } = req.body

  if (!name || !description || !status) {
    throw new BadRequestError("Please provide name description and status ")
  }
  const task = await Task.create({
    name,
    description,
    status,
    createdBy: req.user._id,
  })
  res.status(201).json({ task })
}

export const updateTask = async (req: Request, res: Response) => {
  const { newStatus } = req.body
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      status: newStatus,
    },
    { new: true },
  )
  if (!updatedTask) {
    throw new BadRequestError("No task found")
  }
  res.status(200).json({ task: updatedTask })
}

export const deleteTask = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError("Please provide a task id")
  }
  await Task.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: "Task deleted" })
}
