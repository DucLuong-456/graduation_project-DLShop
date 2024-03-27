const Category = require("../models/category.model");
const Product = require("../models/product.model");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      if (categories.length == 0) res.json({ msg: "Categories is empty!" });
      res.json({ status: 1, code: 200, data: categories });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if role of user == 1 -> Admin
      //Only Admin can create, delete and update category
      //input: cha: parent_id == null, con: parent_id !== null
      const { name, parent_id } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(500).json({ msg: "This category already exists!" });
      if (!parent_id) {
        //Tạo parent category có icon image
        if (!req.file)
          return res.status(500).json({ msg: "No icon category upload!" });
        const icon_category = req.file.originalname;
        const newCategory = new Category({ name, icon_category });
        await newCategory.save();
        res.json({
          status: 1,
          code: 200,
          data: newCategory,
          msg: "Created a category!",
        });
      }
      const newCategory = new Category({ name, parent_id });
      await newCategory.save();
      res.json({
        status: 1,
        code: 200,
        data: newCategory,
        msg: "Created a sub category!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const updateCategory = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { name: name }
      );
      res.json({ updateCategory, msg: "Updated a category!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Product.findOne({ category_id: req.params.id });
      if (products)
        return res
          .status(400)
          .json({ msg: "Please delete all product with a category!" });
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a category!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryController;
