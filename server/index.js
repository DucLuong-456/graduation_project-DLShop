const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./src/routes/index");
const connectDB = require("./src/config/config_db");
const path = require("path");
require("dotenv").config();
const http = require("http");
const configSocketIO = require("./src/config/config.socket");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "src/public")));
app.use(route);
configSocketIO(server, process.env.SOCKET_IO_ORIGIN);
connectDB(process.env.MONGO_URI);
server.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
