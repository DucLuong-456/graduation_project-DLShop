const multer = require("multer");
const path = require("path");
const { isNull } = require("util");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//lọc file chỉ cho file jpg và png qua
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png") {
      req.errorMessage = "file format not correct!";
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = upload;
