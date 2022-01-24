const express = require("express");
const articleRoutes = require("./routes/article");
const themeRoutes = require("./routes/theme");
const authRoutes = require("./routes/auth");

const server = express();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

server.listen(8080);
