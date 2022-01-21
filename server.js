const express = require("express");
const articleRoutes = require("./routes/article");
const themeRoutes = require("./routes/theme");

const server = express();

// Allows to recover JSON Data in request
server.use(express.json({ extended: false }));

server.use("/article", articleRoutes);
server.use('/theme', themeRoutes);

server.listen(8080);
