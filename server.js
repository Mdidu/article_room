const express = require("express");
const articleRoutes = require("./routes/article");

const server = express();

// Allows to recover JSON Data in request
server.use(express.json({ extended: false }));

server.use("/article", articleRoutes);

server.listen(8080);
