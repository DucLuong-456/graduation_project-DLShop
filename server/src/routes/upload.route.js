const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const uploadController = require("../controllers/upload.controller");
const uploadRoute = express.Router();
uploadRoute.post("/", upload.array("images"), uploadController.multiUpload);
uploadRoute.get("/uploadMultiImage/:name", uploadController.getMultiUploadImageProduct);

uploadRoute.post("/uploadMultiImage", uploadController.multiUploadImageProduct);

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
