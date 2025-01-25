export type MyRequestUser = {
  _id: string | unknown
  name: string
  email: string
	createdAt: Date
	updatedAt: Date
}

export type JWTPayload = {
  _id: string
  email: string
}

export type CustomError = {
  statusCode: number
  message: string
}
