const express = require("express");
const productRoute = require("../routes/product.route");
const userRoute = require("../routes/user.route");
const categoryRoute = require("../routes/category.route");
const route = express.Router();

route.use("/api/product", productRoute);
route.use("/api/user", userRoute);
route.use("/api/category", categoryRoute);

module.exports = route;
