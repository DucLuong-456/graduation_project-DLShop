const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const getUserAdmin = (obj) => {
  for (let key in obj) {
    if (obj[key].includes("admin:")) return obj[key];
  }
};

const getUser = (user_id, obj) => {
  for (let key in obj) {
    if (obj[key].includes(user_id)) return obj[key];
  }
};

const configSocketIO = (server, origin) => {
  const io = new Server(server, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
    },
  });
  let UsersConnected = {};
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("login", (data) => {
      const { token, role } = data;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) console.log(err.message);
        const userId = user.id;
        if (role == 2) {
          //check role admin / customer
          socket.join(`admin:${userId}`);
          UsersConnected[`${socket.id}`] = `admin:${userId}`;
        } else {
          socket.join(`user:${userId}`);
          UsersConnected[`${socket.id}`] = `user:${userId}`;
        }
      });
    });

    socket.on("new-order", (data) => {
      const { user_id } = data;
      socket.to(getUserAdmin(UsersConnected)).emit("sendMessage", {
        message: "Có đơn đặt hàng từ khách hàng: " + user_id,
      });
    });
    //admin gui xác thực cho client
    socket.on("correct-status", (user_id) => {
      socket.to(getUser(user_id, UsersConnected)).emit("receive-status", {
        message: "Xác nhận đặt hàng thành công",
      });
    });
    socket.on("disconnect", () => {
      delete UsersConnected[socket.id];
      console.log("User Disconnected", socket.id);
    });
  });
  return io;
};

module.exports = configSocketIO;
