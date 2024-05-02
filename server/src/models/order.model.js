const mongoose = require("mongoose");
const Order = new mongoose.Schema(
  {
    user_id: {
      type: String,
      trim: true,
      required: true,
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
    order_detail: {
      type: Array,
      //[{product_id, quanlity, unit_measure},...]
    },
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
