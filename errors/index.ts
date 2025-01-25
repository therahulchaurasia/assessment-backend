import { StatusCodes } from "http-status-codes"
import { CustomError } from "../types/index"

class CustomAPIError extends Error {
  public statusCode: number
  constructor(error: CustomError) {
    super(error.message)
    this.statusCode = error.statusCode
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super({ statusCode: StatusCodes.BAD_REQUEST, message })
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super({ statusCode: StatusCodes.NOT_FOUND, message })
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super({ statusCode: StatusCodes.UNAUTHORIZED, message })
  }
}

export class ServerError extends CustomAPIError {
  constructor(message: string) {
    super({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message })
  }
}
