const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    // console.log("check token:", authHeader);
    if(!authHeader) return res.status(400).json({msg: "auth header is empty!"}) 
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) res.status(400).json({ msg: "invalid authentication!" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) res.status(400).json({ msg: "invalid authentication!" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
};

module.exports = auth;
