const mongoose = require("mongoose");
//v6 mongodb default options on connect
const connectDB = (URI) => {
  mongoose
    .connect(URI)
    .then(() => console.log("Connect to DB success.."))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
