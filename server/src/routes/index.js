const express = require("express");
const productRoute = require("../routes/product.route");
const userRoute = require("../routes/user.route");
const categoryRoute = require("../routes/category.route");
const orderRoute = require("../routes/order.route");
const reportRoute = require("../routes/report.route");
const route = express.Router();

route.use("/api/product", productRoute);
route.use("/api/user", userRoute);
route.use("/api/category", categoryRoute);
route.use("/api/order", orderRoute);
route.use("/api/report", reportRoute);

module.exports = route;
