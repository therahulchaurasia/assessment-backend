import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import { JWTPayload, MyRequestUser } from "../types/type"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid")
  }
  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JWTPayload
    const user = await User.findOne({ _id: payload._id })
    if (!user) throw new Error("Authentication invalid")
    const MyRequestUser: MyRequestUser = {
      _id: user._id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
    }
    req.user = MyRequestUser
    next()
  } catch (error) {
    throw new Error("Authentication invalid")
  }
}
