import express from "express"
const router = express.Router()

import { getMe } from "../controllers/user.controller"
import { authMiddleware } from "../middleware/auth.middleware"

router.route("/getMe").get(authMiddleware, getMe)

export default router
