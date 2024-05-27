const mongoose = require("mongoose");
const ProductType = new mongoose.Schema(
  {
    product_id: {
      type: String,
    },
    additionalImages: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product_types", ProductType);
