const express = require("express");
const chatController = require("../controllers/chat");
const auth = require("../middlewares/auth");
const router = require("./article");

/**
 * @route chat
 *
 * @method POST
 * @access private
 */
router.route("/").post([auth], chatController.addChat);

module.exports = router;
