import { Types } from "mongoose"
import { DocumentCommonAttributes } from "./global"

export interface UserDocument extends DocumentCommonAttributes {
  name: string
  email: string
  password: string
}

export interface TaskDocument extends DocumentCommonAttributes {
  name: string
  description: string
  status: "pending" | "ongoing" | "completed"
  createdBy: Types.ObjectId
}
