import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserDocument } from "../types"

export interface UserDoc extends UserDocument {
  comparePassword(password: string): boolean
  generateAuthToken(): Promise<string>
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.methods.generateAuthToken = function () {
  const user = this
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7 days",
    },
  )
  return token
}

UserSchema.methods.comparePassword = function (password: string) {
  const isPasswordMatch = bcrypt.compareSync(password, this.password)
  return isPasswordMatch
}

UserSchema.pre<UserDoc>("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  next()
})
export const User = mongoose.model<UserDoc>("User", UserSchema)
