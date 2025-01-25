import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/index"
import { BadRequestError, NotFoundError } from "../errors/index"

const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required")
  }
  const user = await User.create({ name, email, password })
  const token = user.generateAuthToken()
  res.status(StatusCodes.CREATED).json({
    token,
  })
}

const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError("User not found")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect password")
  }
  // compare password
  const token = user.generateAuthToken()
  res.status(StatusCodes.OK).json({
    token,
  })
}

export { loginUserController, registerUserController }
