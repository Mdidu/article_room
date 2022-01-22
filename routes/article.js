const express = require("express");
const articleController = require("../controllers/article");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * GET /article
 * POST /article
 */
router
  .route("/")
  .get(articleController.findAll)
  .post([auth], articleController.addArticle);

/**
 * GET /article/:articleId
 * PUT /article/:articleId
 * DELETE /article/:articleId
 */
router
  .route("/:articleId")
  .get(articleController.findOneById)
  .put([auth], articleController.updateArticle)
  .delete([auth], articleController.deleteArticle);

/**
 * GET /article/theme/:themeId
 */
router.route("/theme/:themeId").get(articleController.findAllByThemeId);

module.exports = router;
