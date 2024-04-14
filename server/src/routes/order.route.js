const orderController = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");
const express = require("express");
const orderRoute = express.Router();
orderRoute.get("/:id", auth, orderController.getDetailOrder);
orderRoute.get("/", auth, orderController.getListOrder);
orderRoute.post("/", auth, orderController.createOrder);
orderRoute.post("/correctOrder/:id", auth, orderController.correctOrder);
orderRoute.post(
  "/correctCompleteOrder/:id",
  auth,
  orderController.correctCompleteOrder
);
orderRoute.post("/cancelOrder/:id", auth, orderController.cancelOrder);

module.exports = orderRoute;
