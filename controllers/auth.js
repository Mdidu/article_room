const authService = require("../services/auth");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {};

/** Code status :
 * SUCCESS 201
 * ECHEC 500
 */
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const { codeStatus, msg } = await authService.signup(email, username, hash);

  codeStatus < 400
    ? res.status(codeStatus).json({ msg })
    : res.status(codeStatus).json({ errors: msg });
};
