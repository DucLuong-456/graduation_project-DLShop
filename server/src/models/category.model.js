const mongoose = require("mongoose");
const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    icon_category: {
      type: String,
      trim: true,
    },
    parent_id: {
      type: String,
      default: null,
    },
    index_display: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("categories", Category);
