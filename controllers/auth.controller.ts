import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/index"
const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new Error("All fields are required")
  }
  const user = await User.create({ name, email, password })
  const token = user.generateAuthToken()
  console.log(token)
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      token,
    },
  })
}

export { registerUserController }
