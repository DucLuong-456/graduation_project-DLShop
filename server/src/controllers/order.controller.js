const User = require("../models/user.model");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const OrderStatus = require("../models/orderStatus.model");
const Product = require("../models/product.model");
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "Aa8vShLXur97hpRITy-40QbR01jhmCX3SOdtM4gAg2KuwdblzEtuvgiVy-VRdIi-PWjv1ttUvHYzXBlI",
  client_secret:
    "EIKh3HT9B4rpm0H1LLiL1MqN0ePJnIYiO9jXZcbVyZeE9Ph75mAzJU09y29mgSzohHDhW1FiLFBIr-gF",
});
const orderController = {
  payment_paypal: async (req, res) => {
    let cartByUserId = await Cart.find({ user_id: req.user.id }).populate(
      "product_id"
    );
    let total = 0;
    if (cartByUserId.length === 0)
      return res.status(400).json({ msg: "Cart is empty!" });
    function convertVNDtoUSD(amountVND) {
      var exchangeRate = 23000;
      var amountUSD = amountVND / exchangeRate;
      amountUSD = Math.round(amountUSD);
      return amountUSD;
    }

    // console.log(cartByUserId);
    let cartForPaypal = cartByUserId.map((item) => {
      var priceForUSD = convertVNDtoUSD(item.product_id.price);
      total =
        total +
        convertVNDtoUSD(item.product_id.price) *
          parseInt(item.quanlity_product);
      return {
        name: `${item.product_id.name}`,
        sku: item.product_id._id,
        price: `${priceForUSD}`,
        currency: "USD",
        quantity: item.quanlity_product,
      };
    });

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:3001/api/order/paysuccess?user_id=${req.user.id}`,
        cancel_url: "http://localhost:3001/api/order/cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartForPaypal,
          },
          amount: {
            currency: "USD",
            total: `${total}`,
          },
          description: "Uy tin gia re, chat luong",
        },
      ],
    };

    //Xử lý payment method
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            return res.json({ url: payment.links[i].href });
          }
        }
      }
    });
  },

  paySuccess: async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const userId = req.query.user_id;
    // console.log("req.query: ", req.query);
    //Xử lý bên method GET
    let cartByUserId = await Cart.find({ user_id: userId }).populate(
      "product_id"
    );
    let total = 0; //VND => USD
    function convertVNDtoUSD(amountVND) {
      var exchangeRate = 23000;
      var amountUSD = amountVND / exchangeRate;
      amountUSD = Math.round(amountUSD);
      return amountUSD;
    }

    cartByUserId.forEach((item) => {
      total =
        total +
        convertVNDtoUSD(item.product_id.price) *
          parseInt(item.quanlity_product);
    });

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: `${total}`,
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log("payment", payment);
          //Lưu vào Order detail
          const productsOrder = payment.transactions[0].item_list.items;

          console.log("productsOrder", productsOrder);
          const listProductOrder = productsOrder.map((element) => {
            return {
              product_id: element.sku,
              quanlity_product: element.quanlity_product,
            };
          });

          const newOrder = await Order.create({
            user_id: userId,
            total_product: productsOrder.length,
            payment_method: "paypal",
            voucher: 0,
            note: "",
            order_address: "123/106 2012 Hoang Xuan khao, Ba Dinh, Ha noi",
            order_status_id: 1,
            order_detail: listProductOrder,
            total_money: total,
          });
          //Xóa sản phẩm đã đặt hàng trong cart
          productsOrder.forEach(async (element) => {
            await Cart.findOneAndDelete({
              product_id: element.sku,
              user_id: userId,
            });
          });
          res.send("order paypal success");
        }
      }
    );
  },
  payCancel: async (req, res) => {
    res.send("Cancelled (Đơn hàng đã hủy)");
  },

  getDetailOrder: async (req, res) => {
    try {
      const order = await Order.findOne({
        
        _id: req.params.id,
      }).populate("user_id order_detail.product_id");
      return res.json(order);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  getOrderByDate: async (req, res) => {
    try {
      const { startDate, endDate, order_status_id } = req.query;
      const whereOption = {};
      if (startDate && endDate)
        whereOption.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
        if(order_status_id) whereOption.order_status_id = order_status_id
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
      }).sort({'createdAt': -1});

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
      let orders = await Order.find({}).sort({'createdAt': -1}).populate('user_id');
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
      if (order.order_status_id === 1)
        await Order.findOneAndUpdate(
          { _id: order_id },
          { order_status_id: 4, payment_status: false }
        );
      else
        return res.status(400).json({msg: "Đơn hàng đang giao không thể hủy"})
      return res.json({ order, msg: "Cancel order success!" });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};

module.exports = orderController;
