const mongoose = require("mongoose");
const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quanlity_sold: {
      type: Number,
      required: true,
    },
    quanlity_stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category_id: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", Product);
