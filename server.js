const express = require("express");
const articleRoutes = require("./routes/article");
const themeRoutes = require("./routes/theme");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const chatController = require("./controllers/chat");

const server = express();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Allows to recover JSON Data in request
server.use(express.json({ extended: false }));

server.use("/article", articleRoutes);
server.use("/theme", themeRoutes);
server.use("/auth", authRoutes);
server.use("/chat", chatRoutes);

const s = server.listen(8080);

const io = require("./socket").init(s);

io.on("connection", (socket) => {
  socket.on("getMessage", () => chatController.findAllChat());
  socket.on("sendMessage", (data) => {
    chatController.addChat(data);
  });
  socket.on("deleteMessage", (data) => {
    chatController.deleteChatMessage(data);
  });
});
