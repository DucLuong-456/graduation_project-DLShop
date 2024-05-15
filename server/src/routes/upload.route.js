const express = require("express");
const upload = require("../middleware/uploadProduct.middleware");
const uploadRoute = express.Router();
uploadRoute.post("/", upload.array("image"), (req, res) => {
  try {
    if (!req.files) return res.status(400).json({ msg: "no file upload" });
    // console.log(req.files);
    const files = req.files.map((item) => {
      return {
        originalname: item.originalname,
        path: item.path,
      };
    });
    return res.json(files);
  } catch (error) {
    console.log(error);
  }
});

module.exports = uploadRoute;
