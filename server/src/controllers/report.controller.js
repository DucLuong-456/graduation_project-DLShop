const Category = require("../models/category.model");
const Product = require("../models/product.model");

const reportController = {
  findProductStock: async (req, res) => {
    try {
      let { limit, page } = req.query;
      limit = limit || 15;
      page = page || 1;
      const skip = limit * (page - 1);
      const findProductStock = await Product.find()
        .select("")
        .limit(limit)
        .skip(skip);
      if (findProductStock.length == 0)
        return res.json({ msg: "products is empty!" });
      return res.json({ status: 1, code: 200, data: findProductStock });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = reportController;
