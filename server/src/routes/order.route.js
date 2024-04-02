const orderController = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");
const express = require("express");
const orderRoute = express.Router();
orderRoute.get("/:id", auth, orderController.getDetailOrder);
orderRoute.get("/listOrder", auth, orderController.getListOrder);
orderRoute.post("/createOrder", auth, orderController.createOrder);

module.exports = orderRoute;
