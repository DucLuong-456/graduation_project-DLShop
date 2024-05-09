const mongoose = require("mongoose");
const Order = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    total_product: {
      type: Number,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
    },
    voucher: {
      type: Number,
      default: 0,
    },
    payment_method: {
      type: String,
      ref: "PaymentMethod",
    },
    order_status_id: {
      type: Number,
    },
    order_address: {
      type: String,
      ref: "OrderAddress",
    },
    order_detail: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quanlity_product: {
          type: Number,
        },
      },
    ],
    total_money: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", Order);
