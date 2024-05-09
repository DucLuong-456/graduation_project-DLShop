const reportController = require("../controllers/report.controller");
const express = require("express");
const reportRoute = express.Router();
reportRoute.get("/", reportController.findProductStock);

module.exports = reportRoute;
