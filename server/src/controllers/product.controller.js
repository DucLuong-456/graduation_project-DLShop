const Product = require("../models/product.model");
const Category = require("../models/category.model");

const productController = {
  getProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      //console.log(product_id);
      const product = await Product.findOne({ _id: product_id });
      if (!product) res.json({ msg: "Product not found!" });
      res.json({
        status: 1,
        code: 200,
        data: product,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        name,
        status,
        brand,
        price,
        quanlity_sold,
        quanlity_stock,
        color,
        description,
        category_id,
      } = req.body;
      // if (!images) return res.status(400).json({ msg: "No image upload" });
      if (
        !name ||
        !status ||
        !brand ||
        !price ||
        !quanlity_sold ||
        !quanlity_stock ||
        !color ||
        !description ||
        !category_id
      )
        return res.status(400).json({ msg: "Field does not empty!" });
      if (req.errorMessage)
        return res.status(400).json({ msg: req.errorMessage });
      if (!req.file)
        return res.status(400).json({ msg: "Does not file upload!" });
      if (
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      )
        return res.status(400).json({ msg: "Format file upload not correct!" });
      if (req.file.size > 2000000)
        return res.status(400).json({ msg: "File size is than larger!" });
      const newProduct = new Product({
        name,
        status,
        brand,
        price,
        quanlity_sold,
        quanlity_stock,
        color,
        description,
        category_id,
        image: req.file.originalname,
      });

      await newProduct.save();
      res.json({ status: 1, code: 200, data: newProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      const products = await Product.find().skip(skip).limit(limit);
      if (products.length == 0)
        return res.status(400).json({ msg: "List product is empty!" });
      res.json({ status: 1, code: 200, data: products });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Product.findOne({ _id: product_id });
      if (!product) res.json({ msg: "Product not found!" });
      const {
        name,
        status,
        brand,
        price,
        quanlity_sold,
        quanlity_stock,
        color,
        description,
        category_id,
        imageProduct,
      } = req.body;
      if (
        !name ||
        !status ||
        !brand ||
        !price ||
        !quanlity_sold ||
        !quanlity_stock ||
        !color ||
        !description ||
        !category_id
      )
        return res.status(400).json({ msg: "Field does not empty!" });
      if (!imageProduct)
        return res.status(400).json({ msg: "No image upload!" });
      //check file
      let updateImageProduct;
      if (req.file != null) {
        if (req.file.size > 2000000)
          return res.status(400).json({ msg: "File size is than larger!" });
        updateImageProduct = req.file.originalname;
        updateImageProduct =
          updateImageProduct == imageProduct
            ? imageProduct
            : updateImageProduct;
      }

      const updateProduct = await Product.findOneAndUpdate(
        { _id: product_id },
        {
          name,
          status,
          brand,
          price,
          quanlity_sold,
          quanlity_stock,
          color,
          description,
          category_id,
          image: updateImageProduct,
        }
      );
      res.json({ status: 1, code: 200, data: updateProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Product.findOne({ _id: product_id });
      if (!product) res.json({ msg: "Product not found!" });
      const deleteProduct = await Product.findOneAndDelete({ _id: product_id });
      res.json({ status: 1, code: 200, data: deleteProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteManyProduct: async (req, res) => {
    try {
      const productsDelete = req.body.productsDelete;
      if (productsDelete.length == 0) res.json({ msg: "Products is empty!" });
      const countProductDelete = await Product.deleteMany({
        _id: { $in: productsDelete },
      });
      res.json(countProductDelete);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
