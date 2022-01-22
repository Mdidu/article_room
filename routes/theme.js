const express = require("express");
const themeController = require("../controllers/theme");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * @route GET theme
 * 
 * @method GET
 * @access public
 * 
 * @method POST
 * @access private
 */
router
  .route("/")
  .get([auth], themeController.findAll)
  .post([auth], themeController.addTheme);

/**
 * @route PUT theme/:themeId
 * 
 * @method PUT
 * @access private
 * 
 * @method DELETE
 * @access private
 */
router
  .route("/:themeId")
  .put([auth], themeController.updateTheme)
  .delete([auth], themeController.deleteTheme);

module.exports = router;
