const commentController = require("../controllers/comment.controller");
const express = require("express");
const commentRoute = express.Router();
const auth = require("../middleware/auth.middleware");
commentRoute.get("/:id", commentController.getAllCommentByProduct);
commentRoute.post("/:id", auth, commentController.createComment);

module.exports = commentRoute;
