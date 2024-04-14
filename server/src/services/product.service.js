const Product = require("../models/product.model");

const orderByNameOrPrice = (sort, limit, skip) => {
  return new Promise(async (reslove, reject) => {
    try {
      const arrSort = ["name", "price", "createdAt"];
      if (sort.startsWith("-")) {
        const sortAttribute = sort.slice(1);
        if (arrSort.includes(sortAttribute)) {
          const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .sort([[sortAttribute, "desc"]]);
          reslove(products);
        }
      } else if (arrSort.includes(sort)) {
        const products = await Product.find()
          .skip(skip)
          .limit(limit)
          .sort([[sort, "asc"]]);
        reslove(products);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { orderByNameOrPrice };
