const path = require("path");
const CheckUploadProduct = (req, res, next) => {
  //console.log(req.body);
  const allowedFormats = [".jpeg", ".png"];
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (!allowedFormats.includes(fileExtension)) {
    // Tệp tin không có định dạng JPEG hoặc PNG
    return res
      .status(400)
      .json({ error: "Tệp tin phải có định dạng JPEG hoặc PNG" });
  }
  next();
};

module.exports = CheckUploadProduct;
