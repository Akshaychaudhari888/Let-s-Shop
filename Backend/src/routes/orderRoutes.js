import express from "express";
import verifyOrder from "../controller/verify-order.controller.js";
import placeOrder from "../controller/place-order.controller.js";
import getOrders from "../controller/get-order.controller.js";
import auth from "../middleware/auth.js";
import getOrdersList from "../controller/get-order-list.controller.js";
import updateOrderStatus from "../controller/update-order-status.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", auth, placeOrder);
orderRouter.post("/verify-order", auth, verifyOrder);
orderRouter.get("/get-orders", auth, getOrders);
orderRouter.get("/get-orders-list", getOrdersList);
orderRouter.put("/update-order-status", updateOrderStatus);

export default orderRouter;
