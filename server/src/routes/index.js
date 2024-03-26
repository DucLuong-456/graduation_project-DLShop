const express = require("express");
const productRoute = require("../routes/product.route");

const route = express.Router();

route.use("/api/product", productRoute);
module.exports = route;
