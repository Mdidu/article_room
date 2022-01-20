const express = require("express");
const articleRoutes = require("./routes/article");

const server = express();

server.use("/article", articleRoutes);

server.listen(8080);
