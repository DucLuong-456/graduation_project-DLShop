const mongoose = require("mongoose");
const Cart = new mongoose.Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
    },
    product_id: {
      type: String,
      trim: true,
    },
    quanlity_product: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carts", Cart);