import { TaskDocument } from "../types/document.d"
import mongoose, { Schema } from "mongoose"

const TaskSchema = new Schema<TaskDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"], // Restrict to specific values
      default: "pending", // Default value
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Task = mongoose.model("Task", TaskSchema)
