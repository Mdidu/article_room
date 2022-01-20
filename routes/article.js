const express = require("express");
const articleController = require("../controllers/article");

const router = express.Router();

/**
 * GET /article
 * POST /article
 */
router
  .route("/")
  .get(articleController.findAll)
  .post(articleController.addArticle);

module.exports = router;
