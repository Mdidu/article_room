const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

/** POST /auth/login */
router.post("/login", authController.login);
/** POST /auth/signup */
router.post("/signup", authController.signup);
/** GET /auth/validate/:username */
router.get("/validate/:username", authController.validateAccount);

module.exports = router;
