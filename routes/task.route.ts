import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller"
import express from "express"
const router = express.Router()

router.route("/").get(getTasks).post(createTask)
router.route("/:id").patch(updateTask).delete(deleteTask)

export default router
