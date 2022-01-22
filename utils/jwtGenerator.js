const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @param { Number } userId
 * @param { String } email
 * @param { String } username
 * @param { Number } roleId
 * @return { String }
 */
exports.createTokenJWT = (userId, email, username, roleId) => {
  const isAdmin = roleId === 3 ? true : false;
  const createdAt = new Date();

  return jwt.sign(
    { id: userId, email, username, admin: isAdmin, createdAt },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
