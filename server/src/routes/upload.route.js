const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const uploadRoute = express.Router();
uploadRoute.post("/", upload.single("image"), (req, res) => {});

module.exports = categoryRoute;
