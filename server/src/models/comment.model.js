const mongoose = require("mongoose");
const Comment = new mongoose.Schema(
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
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", Comment);
