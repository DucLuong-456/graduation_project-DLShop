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
    },
    payment_method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    order_address: {
      type: Array,
    },
    order_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderStatus",
    },
    order_detail: {
      type: Array,
      //[{product_id, quanlity, unit_measure},...]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", Order);
