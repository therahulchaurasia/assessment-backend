import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { User } from "../models/user.model"

export const getMe = async (req: Request, res: Response) => {
  const user = req.user
  res.status(StatusCodes.OK).json({
    user,
  })
}
