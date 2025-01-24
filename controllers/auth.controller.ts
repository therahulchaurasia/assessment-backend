import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/index"
import { MyRequestUser } from "type"
const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new Error("All fields are required")
  }
  const user = await User.create({ name, email, password })
  const token = user.generateAuthToken()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      token,
    },
  })
}

const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error("Please provide email and password")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("Invalid Credentials")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials")
  }
  // compare password
  const token = user.generateAuthToken()
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      token,
    },
  })
}

export { registerUserController, loginUserController }
