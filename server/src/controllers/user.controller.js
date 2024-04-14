const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) res.status(400).json({ msg: "User does not exists!" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) res.status(400).json({ msg: "Incorrect password!" });
      //
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "api/user/refreshToken",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password, address, phone_number } = req.body;
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email đã tồn tại!" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Mật khẩu dài ít nhất 6 ký tự" });
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        address,
        phone_number,
        avatar_image: "defautAvatar.jpg",
      });
      //save mongoDB
      await newUser.save();

      //create token to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "api/user/refreshToken",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/user/refreshToken" });
      return res.status(200).json({ msg: "logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.status(400).json({ msg: "Please Login or Register" });
        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) res.status(400).json({ msg: "user does not exists!" });
      res.json({
        status: 1,
        code: 200,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateInfor: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, address, phone_number } = req.body;
      if (!name || !address || !phone_number)
        return res.status(400).json({ msg: "Input does not empty!" });
      if (req.errorMessage)
        return res.status(400).json({ msg: req.errorMessage });
      if (req.file) {
        const avatar_image = req.file.originalname;

        const userUpdateInfor = await User.findOneAndUpdate(
          { _id: userId },
          { name, address, phone_number, avatar_image }
        );
        return res.json({
          status: 1,
          code: 200,
          data: userUpdateInfor,
          msg: "update infor User success!",
        });
      }
      //neu không upload avatar
      const userUpdateInfor = await User.findOneAndUpdate(
        { _id: userId },
        { name, address, phone_number }
      );
      return res.json({
        status: 1,
        code: 200,
        data: userUpdateInfor,
        msg: "update infor User success!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const customerId = req.user.id;
      const { product_id, quanlity_product } = req.body;
      if (!customerId || !product_id || !quanlity_product)
        return res.json({ msg: "field not be empty!" });
      const isExistProduct = await Cart.findOne({
        product_id: product_id,
        user_id: customerId,
      });
      if (isExistProduct) return res.json({ msg: "Product has been on Cart!" });
      const product = await Product.findOne({
        _id: product_id,
      }).select("quanlity_stock -_id");
      if (product.quanlity_stock < quanlity_product)
        return res.json({ msg: "Số lượng sản phẩm vượt quá!" });
      const newCart = await Cart.create({
        user_id: customerId,
        product_id: product_id,
        quanlity_product,
      });
      return res.json({
        status: 1,
        code: 200,
        msg: "Thành công",
        data: newCart,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const customer_id = req.user.id;
      const listProductOnCart = await Cart.find({
        user_id: customer_id,
      }).populate("product_id");
      return res.json({
        status: 1,
        code: 200,
        msg: "Thành công",
        data: listProductOnCart,
      });
    } catch (error) {
      return res.json(createResponseError(0, 403, error.message, error));
    }
  },
  deleteCart: async (req, res) => {
    const productsId = req.body.deleteProducstId;
    const userId = req.user.id;
    const deleteProducts = productsId.map((product_id) => {
      return Cart.findOneAndDelete({
        $and: [
          { user_id: userId },
          {
            product_id: {
              $in: productsId,
            },
          },
        ],
      });
    });
    await Promise.all(deleteProducts);
    return res.json({ msg: "delete product on cart success!" });
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = userController;
