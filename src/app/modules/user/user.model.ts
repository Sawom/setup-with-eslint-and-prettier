/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt"
import { MongooseError, Schema, model } from "mongoose"
import config from "../../config"
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user.interface"

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    maxlength: [20, "Password can not be more than 20 characters"],
    required: true,
  },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true, required: true },
  hobbies: [{ type: String, required: true }],
  address: { type: addressSchema },
  orders: [{ type: orderSchema }],
})

userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post("save", async function (doc, next) {
  try {
    const user = await User.findById(doc._id).select("-password -orders")
    if (user) {
      Object.assign(doc, user)
    }

    next()
  } catch (error) {
    next(error as MongooseError)
  }
})

userSchema.statics.isUserExists = async function (
  userId: number | string,
): Promise<TUser | null> {
  const existingUser = await this.findOne({ userId: userId })
  return existingUser
}
export const User = model<TUser, UserModel>("User", userSchema)
