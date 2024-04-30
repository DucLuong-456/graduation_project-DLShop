const mongoose = require("mongoose");
const Cart = new mongoose.Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    quanlity_product: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carts", Cart);
