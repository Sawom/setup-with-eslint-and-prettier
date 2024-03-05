/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express"
import { UserServices } from "./user.services"
import { UserZodSchema } from "./user.validation"

const createUser = async (req: Request, res: Response) => {
  try {
    const query = req.body

    const zodValidateData = UserZodSchema.parse(query)
    const result = await UserServices.createUserDB(zodValidateData)

    res.status(201).json({
      success: true,
      message: "User Created successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()

    res.status(200).json({
      success: true,
      message: "User Fetched successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "No user Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: "Single User Fetched successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const { userId } = req.params

    const result = await UserServices.updateUserFromDB(userId, user)

    res.status(200).json({
      success: true,
      message: "User Updated successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: {
        code: error.code || 500,
        description: error.message || "User not Found",
      },
    })
  }
}

const addOrder = async (req: Request, res: Response) => {
  try {
    const { productName, price, quantity } = req.body
    const { userId } = req.params

    const result = await UserServices.addOrdersToDB(userId, [
      { productName, price, quantity },
    ])

    res.status(200).json({
      success: true,
      message: "Order added successfully!",
      data: null,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Orders not Found",
      error: {
        code: error.code || 500,
        description: error.message || "Order not Found",
      },
    })
  }
}
const getOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getOrdersFromDB(userId)
    if (!result) {
      throw new Error("Failed to fetch orders.")
    }

    const orders = result.orders

    res.status(200).json({
      success: true,
      message: "Order Fetched successfully!",
      data: orders,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Order not Found",
      error: {
        code: error.code || 500,
        description: error.message || "Order not Found",
      },
    })
  }
}
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getTotalPriceDB(userId)

    res.status(200).json({
      success: true,
      message: "Total Price Calculated successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Total price not Found",
      error: {
        code: error.code || 500,
        description: error.message || "Total price not Found",
      },
    })
  }
}
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addOrder,
  getOrder,
  getTotalPrice,
}
