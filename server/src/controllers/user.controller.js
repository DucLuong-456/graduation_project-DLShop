const User = require("../models/user.model");
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
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = userController;
