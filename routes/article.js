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

/**
 * GET /article/:articleId
 */
router.route("/:articleId").get(articleController.findOneById);

/**
 * GET /article/theme/:themeId
 */
router.route("/theme/:themeId").get(articleController.findAllByThemeId);

module.exports = router;
