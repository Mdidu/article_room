const express = require("express");
const themeController = require("../controllers/theme");

const router = express.Router();

/**
 * GET /theme
 * POST /theme
 */
router.route("/").get(themeController.findAll).post(themeController.addTheme);

/**
 * PUT /theme/:themeId
 * DELETE /theme/:themeId
 */
router
  .route("/:themeId")
  .put(themeController.updateTheme)
  .delete(themeController.deleteTheme);

module.exports = router;
