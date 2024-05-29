const reportController = require("../controllers/report.controller");
const express = require("express");
const reportRoute = express.Router();
reportRoute.post("/export", reportController.exportExcell);
reportRoute.post("/export/profit", reportController.exportExcellProfit);
reportRoute.post("/export/revenue", reportController.reportOrderRevenue);


reportRoute.get("/", reportController.findProductStock);

module.exports = reportRoute;
