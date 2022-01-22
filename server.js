const express = require("express");
const articleRoutes = require("./routes/article");
const themeRoutes = require("./routes/theme");
const authRoutes = require("./routes/auth");

const server = express();

// Allows to recover JSON Data in request
server.use(express.json({ extended: false }));

server.use("/article", articleRoutes);
server.use("/theme", themeRoutes);
server.use("/auth", authRoutes);

server.listen(8080);
