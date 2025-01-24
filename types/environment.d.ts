import { MyRequestUser } from './type'

declare global {
  namespace Express {
    interface Request extends Request {
      user: MyRequestUser
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
      JWT_SECRET: string
    }
  }
}

export {}
