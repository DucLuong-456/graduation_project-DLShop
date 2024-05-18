const Comment = require("../models/comment.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const commentController = {
  getAllCommentByProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Product.findOne({ _id: product_id });
      if (!product)
        return res.status(400).json({ msg: "Khong tim thay san pham!" });
      const commentsByProduct = await Comment.find({
        product_id: product_id,
      })
        .populate({
          path: "user_id",
          select: "name",
        })
        .sort({ createdAt: -1 });

      return res.json(commentsByProduct);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Product.findOne({ _id: product_id });
      if (!product)
        return res.status(400).json({ msg: "Khong tim thay san pham!" });
      const user_id = req.user.id;
      const user = await User.findOne({ _id: user_id });
      if (!user)
        return res.status(400).json({ msg: "Khong tim thay nguoi dung!" });
      const { content } = req.body;
      const comment = await Comment.create({ product_id, user_id, content });
      return res.json({ comment, user_name: user.name });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};
module.exports = commentController;
