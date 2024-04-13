const mongoose = require("mongoose");
const ProductType = new mongoose.Schema(
  {
    product_id: {
      type: String,
    },
    color: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product_types", ProductType);
