import express from "express"
import { UserController } from "./user.controller"
const router = express.Router()

router.post("/", UserController.createUser)
router.get("/", UserController.getAllUser)
router.get("/:userId", UserController.getSingleUser)
router.put("/:userId", UserController.updateSingleUser)
router.delete("/:userId", UserController.deleteUser)
router.put("/:userId/orders", UserController.addOrder)
router.get("/:userId/orders", UserController.getOrder)
router.get("/:userId/orders/total-price", UserController.getTotalPrice)
export const UserRoutes = router
