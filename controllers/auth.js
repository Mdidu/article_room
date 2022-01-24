const authService = require("../services/auth");
const bcrypt = require("bcrypt");

/**
 * @code 200
 * @code 401
 */
exports.login = async (req, res) => {
  const { codeStatus, msg, user, token } = await authService.login(req.body);

  codeStatus === 401
    ? res.status(codeStatus).json({ msg })
    : res.status(codeStatus).json({ msg, user, token: token });
};

/**
 * @code 200
 * @code 401
 */
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const { codeStatus, msg } = await authService.signup(email, username, hash);

  res.status(codeStatus).json({ msg });
};

/**
 * @code 200
 * @code 401
 */
exports.validateAccount = async (req, res) => {
  const username = req.params.username;

  const { codeStatus, msg } = await authService.validateAccount(username);

  res.status(codeStatus).json({ msg });
};
