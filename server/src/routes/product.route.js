const productController = require("../controllers/product.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const pagination = require("../middleware/pagination.middleware");
const auth = require("../middleware/auth.middleware");
const productRoute = express.Router();
productRoute.get("/:id", productController.getProduct);
productRoute.get("/", pagination, productController.getAllProduct);
productRoute.get(
  "/byCategory/:id",
  pagination,
  productController.getProductByCategory
);
productRoute.post("/", upload.single("image"), productController.createProduct);
productRoute.put(
  "/:id",
  auth,
  upload.single("image"),
  productController.updateProduct
);
productRoute.delete("/:id", productController.deleteProduct);
productRoute.delete("/", productController.deleteManyProduct);

productRoute.post(
  "/product_type",
  upload.single("image"),
  productController.createProductType
);
//:id: productType_id
productRoute.post(
  "/change_status_pd_type/:id",
  productController.changeStatusProductType
);
//p_id: product_id
productRoute.get(
  "/product_type/:p_id",
  productController.getAllProductTypeById
);

module.exports = productRoute;
