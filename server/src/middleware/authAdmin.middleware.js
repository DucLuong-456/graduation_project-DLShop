const User = require("../models/user.model");
const authAdmin = async (req, res, next) => {
  try {

    const user = await User.findOne( { _id: req.user.id } );
    if (user.role_id == 1)
      return res.status(400).json({ msg: "Admin resource access denied" });
    next();
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
};

module.exports = authAdmin;
