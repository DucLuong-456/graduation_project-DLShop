const userController = require("../controllers/user.controller");
const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const userRoute = express.Router();
userRoute.post("/login", userController.login);
userRoute.post("/register", userController.register);
userRoute.get("/logout", userController.logout);
userRoute.post("/refresh_token", userController.refreshToken);
userRoute.get("/getInfor", userController.getInfor);

module.exports = userRoute;
