const express = require("express");
const themeController = require("../controllers/theme");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * GET /theme
 * POST /theme
 */
router
  .route("/")
  .get([auth], themeController.findAll)
  .post([auth], themeController.addTheme);

/**
 * PUT /theme/:themeId
 * DELETE /theme/:themeId
 */
router
  .route("/:themeId")
  .put([auth], themeController.updateTheme)
  .delete([auth], themeController.deleteTheme);

module.exports = router;
