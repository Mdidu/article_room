const express = require("express");
const articleController = require("../controllers/article");

const router = express.Router();

/**
 * GET /article
 */
router
  .route("/")
  .get(articleController.findAll);

module.exports = router;
