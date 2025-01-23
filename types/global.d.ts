import { Document } from "mongoose"

export type MongoId = string | unknown

export interface DocumentCommonAttributes extends Document {
  _id: MongoId
  id: string
  createdAt: Date
  updatedAt: Date
}
