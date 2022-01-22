const express = require("express");
const articleController = require("../controllers/article");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * @route article
 * 
 * @method GET
 * @access public
 * 
 * @method POST
 * @access private
 */
router
  .route("/")
  .get(articleController.findAll)
  .post([auth], articleController.addArticle);

/**
 * @route article/:articleId
 * 
 * @method GET
 * @access public
 * 
 * @method PUT
 * @access private
 * 
 * @method DELETE
 * @access private
 */
router
  .route("/:articleId")
  .get(articleController.findOneById)
  .put([auth], articleController.updateArticle)
  .delete([auth], articleController.deleteArticle);

/**
 * @route article/theme/:themeId
 * 
 * @method GET
 * @access public
 */
router.route("/theme/:themeId").get(articleController.findAllByThemeId);

module.exports = router;
