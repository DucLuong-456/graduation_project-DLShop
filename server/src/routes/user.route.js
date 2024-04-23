const userController = require("../controllers/user.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const userRoute = express.Router();
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

userRoute.post("/login", userController.login);
userRoute.post("/register", userController.register);
userRoute.get("/logout", userController.logout);
userRoute.get("/refresh_token", auth, userController.refreshToken);
userRoute.get("/getInfor", auth, userController.getInfor);
userRoute.put(
  "/updateInfor",
  auth,
  upload.single("avatar_image"),
  userController.updateInfor
);
userRoute.post("/addTocart", auth, userController.addToCart);
userRoute.get("/cart", auth, userController.getCart);
userRoute.delete("/deleteCart", auth, userController.deleteCart);

module.exports = userRoute;
