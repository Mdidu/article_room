const authRepository = require("../../repository/auth");

/** Checking if log already exist
 * @param { String } email
 * @param { String } username
 * @return { Promise<{Boolean, Boolean}> }
 */
const getSignup = async (email, username) => {
  const result = await authRepository.getSignup(email, username);

  if (result.rowCount > 0) {
    const datas = result.rows;

    const emailAlreadyExist = checkingEmail(email, datas);
    const usernameAlreadyExist = checkingUsername(username, datas);

    return { emailAlreadyExist, usernameAlreadyExist };
  }

  return { emailAlreadyExist: false, usernameAlreadyExist: false };
};

/** Checking if email already exist
 * @param { String } email
 * @param { Array } datas
 * @return { Boolean }
 */
const checkingEmail = (email, datas) => {
  const emailToCheck = datas
    .filter((data) => data.email === email)
    .map((data) => data.email)
    .toString();

  return email === emailToCheck ? true : false;
};

/** Checking if username already exist
 * @param { String } username
 * @param { Array } datas
 * @return { Boolean }
 */
const checkingUsername = (username, datas) => {
  const usernameToCheck = datas
    .filter((data) => data.username === username)
    .map((data) => data.username)
    .toString();

  return username === usernameToCheck ? true : false;
};

module.exports = getSignup;
