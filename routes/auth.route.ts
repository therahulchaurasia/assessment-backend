import express, { Router } from "express"
import { registerUserController } from "../controllers"
const router = Router()

router.post("/register", registerUserController)

export default router
