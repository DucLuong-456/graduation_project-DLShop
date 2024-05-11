const userController = require("../controllers/user.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const userRoute = express.Router();
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

userRoute.post("/login", userController.login);
userRoute.get("/getAllUser", auth, userController.getAllUser);
userRoute.delete("/deleteUser/:id", auth, userController.deleteUser);

userRoute.post("/register", userController.register);
userRoute.get("/logout", auth, userController.logout);
userRoute.get("/refresh_token", auth, userController.refreshToken);
userRoute.put("/update/:id", auth, userController.UpdateUser);
userRoute.put(
  "/updateInfor",
  auth,
  upload.single("avatar_image"),
  userController.updateInfor
);

userRoute.get("/getInfor", auth, userController.getInfor);

userRoute.post("/addTocart", auth, userController.addToCart);
userRoute.get("/cart", auth, userController.getCart);
userRoute.delete("/deleteCart", auth, userController.deleteCart);
userRoute.delete("/deleteCart", auth, userController.deleteCart);
userRoute.put("/changePassword", auth, userController.changePasword);

module.exports = userRoute;
