import { z } from "zod"
const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
})

const addressSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
})

const orderSchema = z.object({
  productName: z.string().min(1, { message: "Product Name is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  quantity: z.number().min(1, { message: "Quantity is required" }),
})

const userSchema = z.object({
  userId: z.number().int().positive().min(1, { message: "UserId is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().max(20).min(1, { message: "Password is required" }),
  fullName: fullNameSchema,
  age: z.number().int().positive().min(1, { message: "age is required" }),
  email: z.string().email().min(1, { message: "email is required" }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).min(1, { message: "Hobbies is required" }),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
})

export const UserZodSchema = userSchema
