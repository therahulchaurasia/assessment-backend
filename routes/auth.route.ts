import express, { Router } from 'express'
import { loginUserController, registerUserController } from '../controllers'
import { authMiddleware } from '../middleware'
const router = Router()

router.post('/register', registerUserController)
router.post('login', authMiddleware, loginUserController)

export default router
