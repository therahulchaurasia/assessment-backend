export type MyRequestUser = {
  _id: string | unknown
  id: string
  email: string
}

export type JWTPayload = {
  _id: string
  email: string
}

export type CustomError = {
  statusCode: number
  message: string
}
