const Banner = require("../models/banner.model");
const uploadController = {
  mutiUpload: async (req, res) => {
    try {
      if (!req.files) return res.status(400).json({ msg: "no file upload" });
      // console.log(req.files);
      const files = req.files.map((item) => {
        return {
          originalname: item.originalname,
          path: item.path,
        };
      });
      // await Product.findOneAndUpdate({_id})
      return res.json(files);
    } catch (error) {
      console.log(error);
    }
  },
  uploadBanner: async (req, res) => {
    try {
      const { name } = req.body;
      if (!req.file)
        return res.status(400).json({ msg: "file does not upload!" });
      const banner = await Banner.create({ name, image: req.file.filename });

      return res.json(banner);
    } catch (error) {
      console.log(error);
    }
  },
  getAllBanner: async (req, res) => {
    try {
      const banners = await Banner.find({});
      if (!banners) return res.status(400).json({ msg: "banners đang trống" });
      return res.json(banners);
    } catch (error) {
      console.log(error);
    }
  },
  updateBanner: async (req, res) => {
    try {
      const id = req.params.id;
      const banner = await Banner.findOne({ _id: id });
      if (!banner)
        return res.status(400).json({ msg: "banner does not exists" });
      let updateImage = banner.image;
      if (req.file) {
        updateImage = req.file.filename;
      }
      const updateBanner = await Banner.findOneAndUpdate(
        { _id: id },
        { image: updateImage }
      );

      return res.json(updateBanner);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = uploadController;
