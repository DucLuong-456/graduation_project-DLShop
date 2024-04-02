const User = require("../models/user.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

const orderController = {
  getDetailOrder: async (req, res) => {
    try {
      const product = await Order.findOne({
        user_id: req.user.id,
        _id: req.params.id,
      });
      return res.json(product);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  getListOrder: async (req, res) => {
    try {
      const products = await Order.find({
        user_id: req.user.id,
      });
      return res.json({ status: 1, code: 200, data: products });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      //console.log(userId);
      //lấy danh sách id sản phẩm selected: checkbox client;
      const productsIdSelected = req.body.productsIdSelected;
      const productsOrder = await Cart.find({
        $and: [
          { user_id: userId },
          {
            product_id: {
              $in: productsIdSelected, //type []
            },
          },
        ],
      });
      //console.log(productsOrder);
      if (productsOrder.length === 0)
        return res.json({ msg: "Please choose product to order!" });
      let total_product = 0;
      for (var i = 0; i < productsOrder.length; i++) {
        total_product += productsOrder[i].quanlity_product;
      }
      const { payment_method, voucher, note, order_address, order_status } =
        req.body;
      if (
        !payment_method ||
        !voucher ||
        !note ||
        !order_address ||
        !order_status
      )
        res.json({ msg: "Field not be empty!" });

      //Lưu vào Order detail

      let listProductOrder = productsOrder.map((element) => {
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
        order_status,
        order_detail: listProductOrder,
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
};

module.exports = orderController;
