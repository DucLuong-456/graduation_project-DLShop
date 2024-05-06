const categoryController = require("../controllers/category.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const categoryRoute = express.Router();
categoryRoute.get("/", categoryController.getCategories);
categoryRoute.post(
  "/",
  upload.single("image"),
  categoryController.createCategory
);
categoryRoute.put(
  "/:id",
  upload.single("image"),
  categoryController.updateCategory
);
categoryRoute.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRoute;
