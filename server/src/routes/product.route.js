const productController = require("../controllers/product.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const pagination = require("../middleware/pagination.middleware");
const CheckUploadProduct = require("../middleware/fileUpload.middleware");
const productRoute = express.Router();
productRoute.get("/:id", productController.getProduct);
productRoute.get("/", pagination, productController.getAllProduct);
productRoute.post("/", upload.single("image"), productController.createProduct);
productRoute.put(
  "/:id",
  upload.single("image"),
  productController.updateProduct
);
productRoute.delete("/:id", productController.deleteProduct);
productRoute.delete("/", productController.deleteManyProduct);

module.exports = productRoute;
