import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.error(err)
  if (err?.extensions?.code === "UNAUTHORIZED") {
    return res.status(StatusCodes.UNAUTHORIZED).json(err)
  }
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",")
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ message: customError.msg })
}
