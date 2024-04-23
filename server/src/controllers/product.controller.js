const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ProductType = require("../models/productType.model");
const productController = {
  getProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
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
        description,
        category_id,
      } = req.body;
      if (
        !name ||
        !status ||
        !brand ||
        !price ||
        !quanlity_sold ||
        !quanlity_stock ||
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
      const productCheckExists = await Product.findOne({ name: name });
      if (productCheckExists)
        return res.json({ msg: "Product dupplicate name!" });
      const categoryCheck = await Category.findOne({ _id: category_id });
      if (!categoryCheck) return res.json({ msg: "Category does not exists!" });
      const newProduct = new Product({
        name,
        status,
        brand,
        price,
        quanlity_sold,
        quanlity_stock,
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
      let { limit, page, sort, name } = req.query;
      (limit = limit || 8), (page = page || 1);
      const skip = (page - 1) * limit;
      const whereOptions = {};
      if (name) {
        whereOptions.name = {
          $regex: name,
          $options: "i",
        };
      }
      const sortOptions = [];
      if (sort) {
        if (sort == "name_asc") {
          sortOptions.push(["name", "asc"]);
        } else if (sort == "name_desc") {
          sortOptions.push(["name", "desc"]);
        }

        if (sort == "price_asc") {
          sortOptions.push(["price", "asc"]);
        }
      } else if (sort == "price_desc") {
        sortOptions.push(["price", "desc"]);
      }

      const countProduct = await Product.countDocuments(whereOptions);
      const products = await Product.find(whereOptions)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);
      if (products.length == 0)
        return res.status(400).json({ msg: "List product is empty!" });
      res.json({
        data: products,
        paging: {
          limit: limit,
          page: page,
          total_count: countProduct,
        },
      });
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
  //CRUD product type
  //Post
  createProductType: async (req, res) => {
    try {
      const { product_id, color } = req.body;
      const image = req.file.originalname;
      if (!product_id || !color || !image) res.json("input is required!");
      const productCheckExists = await Product.findOne({ _id: product_id });
      if (!productCheckExists) res.json({ msg: "Product does not exists" });
      const newProductType = new ProductType({ product_id, color, image });
      await newProductType.save();
      return res.json({ msg: "create product type success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //Post: /:id
  changeStatusProductType: async (req, res) => {
    try {
      const productUpdateStatus = await ProductType.findOneAndUpdate(
        { _id: req.params.id },
        { status: false }
      );
      return res.json({
        data: productUpdateStatus,
        msg: "update status product type success!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //get: body:{product_id}
  getAllProductTypeById: async (req, res) => {
    try {
      const product_id = req.params.p_id;
      const productTypes = await ProductType.find({
        product_id: product_id,
      });
      return res.json({
        data: productTypes,
        msg: "get all product type by product ID!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
