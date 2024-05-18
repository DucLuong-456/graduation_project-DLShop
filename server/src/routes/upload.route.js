const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const uploadController = require("../controllers/upload.controller");
const uploadRoute = express.Router();
uploadRoute.post("/", upload.array("image"), uploadController.mutiUpload);
uploadRoute.get("/banner", uploadController.getAllBanner);
uploadRoute.put(
  "/banner/:id",
  upload.single("file"),
  uploadController.updateBanner
);
uploadRoute.post(
  "/banner",
  upload.single("file"),
  uploadController.uploadBanner
);

module.exports = uploadRoute;
