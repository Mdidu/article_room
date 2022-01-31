const express = require("express");
const chatController = require("../controllers/chat");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * @route chat
 *
 * @method GET
 * @access public
 *
 * @method POST
 * @access private
 */
router
  .route("/")
  .get(chatController.findAllChat)
  .post([auth], chatController.addChat);

module.exports = router;
