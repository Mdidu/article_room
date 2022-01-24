const authRepository = require("../repository/auth");
const getSignup = require("./check/signup");
const bcrypt = require("bcrypt");
const { createTokenJWT } = require("../utils/jwtGenerator");
const sendMail = require("../utils/sendMail");

/**
 * Login logic
 * @param { Object } body
 * @return { Promise<{codeStatus: Number, user: {username: String, roleName: String}, msg: String}> }
 */
exports.login = async (body) => {
  const { email, password } = body;

  const result = (await authRepository.login(email)).rows[0];

  const passwordValid = await bcrypt.compare(password, result.password);

  let roleName = "User";
  if (+result.role_id === 2) roleName = "Moderator";
  else if (+result.role_id === 3) roleName = "Admin";

  if (!result || !passwordValid)
    return { codeStatus: 401, msg: "Incorrect email or password !" };

  if (!result.validate) {
    sendMail(email, result.username);
    return {
      codeStatus: 401,
      msg: "Account not validate ! Please validate it with the email you received !",
    };
  }

  const token = createTokenJWT(
    +result.id,
    result.email,
    result.username,
    +result.role_id
  );

  return {
    codeStatus: 200,
    msg: "Login sucessfully",
    user: {
      username: result.username,
      roleName,
    },
    token,
  };
};

/**
 * Signup logic
 * @param { String } email
 * @param { String } username
 * @param { String } passwordHash
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.signup = async (email, username, passwordHash) => {
  const roleId = 1;
  const validate = false;
  const checkingLog = await getSignup(email, username);

  if (checkingLog.emailAlreadyExist && checkingLog.usernameAlreadyExist)
    return { codeStatus: 401, msg: "Email and Username already used" };
  else if (checkingLog.emailAlreadyExist)
    return { codeStatus: 401, msg: "Email already used" };
  else if (checkingLog.usernameAlreadyExist)
    return { codeStatus: 401, msg: "Username already used" };

  try {
    const result = await authRepository.signup(
      email,
      username,
      passwordHash,
      roleId,
      validate
    );

    if (result.rowCount === 0) {
      return {
        codeStatus: 401,
        msg: "Created account failed !",
      };
    }

    sendMail(email, username);

    return {
      codeStatus: 201,
      msg: "Created sucessfully ! An email has been sent to you to validate your account !",
    };
  } catch (error) {
    return { codeStatus: 401, msg: error.message };
  }
};

/**
 * Validate account
 * @param { String } username
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.validateAccount = async (username) => {
  const userDatas = (await authRepository.findOneByUsername(username)).rows;
  if (userDatas.length === 0)
    return { codeStatus: 401, msg: "Unknown account !" };

  if (userDatas[0].validate)
    return { codeStatus: 401, msg: "Account already validate !" };

  const updatedValidateAccount = await authRepository.updateUserValidate(
    username,
    true
  );

  if (updatedValidateAccount.rowCount === 0)
    return { codeStatus: 401, msg: "Updated failed !" };

  return { codeStatus: 200, msg: "Updated sucessfully !" };
};
