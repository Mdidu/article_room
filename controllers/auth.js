const authService = require("../services/auth");
const bcrypt = require("bcrypt");

/** Code status :
 * SUCCESS 200
 * ECHEC 401
 */
exports.login = async (req, res) => {
  const result = await authService.login(req.body);

  if (result.codeStatus === 401)
    return res.status(result.codeStatus).json({ errors: result.msg });

  res.status(result.codeStatus).json({ msg: result.msg, token: result.token });
};

/** Code status :
 * SUCCESS 201
 * ECHEC 401
 */
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const { codeStatus, msg } = await authService.signup(email, username, hash);

  codeStatus === 201
    ? res.status(codeStatus).json({ msg })
    : res.status(codeStatus).json({ errors: msg });
};

/** Code status :
 * SUCCESS 200
 * ECHEC 401
 */
exports.validateAccount = async (req, res) => {
  const username = req.params.username;

  const { codeStatus, msg } = await authService.validateAccount(username);

  codeStatus === 200
    ? res.status(codeStatus).json({ msg })
    : res.status(codeStatus).json({ errors: msg });
};
