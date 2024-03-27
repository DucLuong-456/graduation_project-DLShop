const mongoose = require("mongoose");
const PaymentMethod = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("paymentMethod", PaymentMethod);
