const authRepository = require("../repository/auth");
const getSignup = require("./check/signup");

/**
 * Signup Logic
 */
exports.signup = async (email, username, passwordHash) => {
  const roleId = 1;
  const validate = false;
  const checkingLog = await getSignup(email, username);

  if (checkingLog.emailAlreadyExist && checkingLog.usernameAlreadyExist)
    return { codeStatus: 500, msg: "Email and Username already used" };
  else if (checkingLog.emailAlreadyExist)
    return { codeStatus: 500, msg: "Email already used" };
  else if (checkingLog.usernameAlreadyExist)
    return { codeStatus: 500, msg: "Username already used" };

  try {
    await authRepository.signup(
      email,
      username,
      passwordHash,
      roleId,
      validate
    );
    return { codeStatus: 201, msg: "Created sucessfully" };
  } catch (error) {
    return { codeStatus: 500, msg: error.message };
  }
};
