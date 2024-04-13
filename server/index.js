const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./src/routes/index");
const connectDB = require("./src/config/config_db");
const path = require("path");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "src/public")));
app.use(route);

connectDB(process.env.MONGO_URI);
app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
