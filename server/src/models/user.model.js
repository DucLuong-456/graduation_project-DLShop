const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      default: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    avatar_image: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role_id: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", User);
