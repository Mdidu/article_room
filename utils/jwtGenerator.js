const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createTokenJWT = (userId, email, username, roleId) => {
  const isAdmin = roleId === 3 ? true : false;
  const createdAt = new Date();

  return jwt.sign(
    { id: userId, email, username, admin: isAdmin, createdAt },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
