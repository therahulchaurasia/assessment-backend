import { DocumentCommonAttributes } from "./global"

export interface UserDocument extends DocumentCommonAttributes {
  name: string
  email: string
  password: string
}
