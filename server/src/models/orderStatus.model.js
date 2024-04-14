const mongoose = require("mongoose");
const OrderStatus = new mongoose.Schema(
  {
    order_status_id: {
      type: Number,
    },
    name: {
      type: String,
      //   status: ["chờ xác nhận", "đang giao", "hoàn thành", "hủy"],
      //[{id, name},...]
      //đang xử lý, chờ xác nhận, đang giao, hoàn thành, hủy
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderStatus", OrderStatus);
