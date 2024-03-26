const User = require("../models/user.model");
const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user.role == 1)
      res.status(400).json({ msg: "Admin resource access denied" });
    next();
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
};

module.export = authAdmin;
