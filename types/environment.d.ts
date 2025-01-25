import { MyRequestUser } from "../type" // Adjust the import path as needed

export {}

declare global {
  namespace Express {
    interface Request {
      user: MyRequestUser
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
      JWT_SECRET: string
      ALLOWED_ORIGIN: string
    }
  }
}
