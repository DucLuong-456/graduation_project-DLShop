const User = require("../models/user.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const OrderStatus = require("../models/orderStatus.model");
const Product = require("../models/product.model");
const orderController = {
  getDetailOrder: async (req, res) => {
    try {
      const order = await Order.findOne({
        user_id: req.user.id,
        _id: req.params.id,
      }).populate("user_id order_detail.product_id");
      return res.json(order);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  getOrderByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const whereOption = {};
      if (startDate && endDate)
        whereOption.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      const orders = await Order.find(whereOption);
      return res.json({
        status: 1,
        code: 200,
        data: orders,
      });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  getListOrder: async (req, res) => {
    try {
      const orders = await Order.find({
        user_id: req.user.id,
      });

      const user = await User.findOne({ _id: req.user.id });
      return res.json({
        status: 1,
        code: 200,
        data: { orders: orders, user_name: user.name },
      });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      let orders = await Order.find({});
      return res.json({
        status: 1,
        code: 200,
        data: { orders: orders },
      });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      //lấy danh sách id sản phẩm selected: checkbox client;
      const productsIdSelected = req.body.productsIdSelected;
      const productsOrder = await Cart.find({
        $and: [
          { user_id: userId },
          {
            product_id: {
              $in: productsIdSelected,
            },
          },
        ],
      });

      if (productsOrder.length === 0)
        return res.json({ msg: "Please choose product to order!" });
      let total_product = 0;
      for (var i = 0; i < productsOrder.length; i++) {
        total_product += productsOrder[i].quanlity_product;
      }
      const { payment_method, voucher, note, order_address, total_money } =
        req.body;
      if (!payment_method || !order_address || !total_money)
        return res.json({ msg: "Field not be empty!" });

      //Lưu vào Order detail
      const listProductOrder = productsOrder.map((element) => {
        return {
          product_id: element.product_id,
          quanlity_product: element.quanlity_product,
        };
      });

      const newOrder = await Order.create({
        user_id: userId,
        total_product,
        payment_method,
        voucher,
        note,
        order_address,
        order_status_id: 1,
        order_detail: listProductOrder,
        total_money: total_money,
      });
      //Xóa sản phẩm đã đặt hàng trong cart
      productsOrder.forEach(async (element) => {
        await Cart.findOneAndDelete({
          product_id: element.product_id,
          user_id: userId,
        });
      });
      return res.json({
        status: 1,
        code: 200,
        msg: "Thành công",
        data: newOrder,
      });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },

  correctOrder: async (req, res) => {
    try {
      const order_id = req.params.id;
      const order = await Order.findOne({ _id: order_id });
      if (!order) return res.json({ msg: "order does not exists!" });
      await Order.findOneAndUpdate({ _id: order_id }, { order_status_id: 2 });
      return res.json({ order, msg: "Correct order success!" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  correctCompleteOrder: async (req, res) => {
    try {
      const order_id = req.params.id;
      const order = await Order.findOne({ _id: order_id });
      if (!order) return res.json({ msg: "order does not exists!" });
      const updateQuanlityProduct = order.order_detail.map((product) => {
        return Product.findOneAndUpdate(
          { _id: product.product_id },
          {
            $inc: {
              quanlity_sold: product.quanlity_product,
              quanlity_stock: -product.quanlity_product,
            },
          }
        );
      });
      const test = await Promise.all(updateQuanlityProduct);
      // console.log(test);
      await Order.findOneAndUpdate(
        { _id: order_id },
        { order_status_id: 3, payment_status: true }
      );
      return res.json({ order, msg: "Compelete order success!" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const order_id = req.params.id;
      const order = await Order.findOne({ _id: order_id });
      if (!order) return res.json({ msg: "order does not exists!" });
      if (order.order_status_id === 1 || order.order_status_id === 3)
        await Order.findOneAndUpdate({ _id: order_id }, { order_status_id: 4 });
      return res.json({ order, msg: "Cancel order success!" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};

module.exports = orderController;
