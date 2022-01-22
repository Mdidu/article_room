const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

/**
 * @route auth/login
 *
 * @method POST
 * @access public
 */
router.post("/login", authController.login);

/**
 * @route auth/signup
 *
 * @method POST
 * @access public
 */
router.post("/signup", authController.signup);

/**
 * @route auth/validate/:username
 *
 * @method GET
 * @access public
 */
router.get("/validate/:username", authController.validateAccount);

module.exports = router;
