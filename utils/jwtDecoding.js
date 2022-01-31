const jwt = require("jsonwebtoken");

exports.decodingJWT = (token) => {
  try {
    return jwt.verify(token + "", process.env.JWT_SECRET);
  } catch (error) {
    return "Invalid token";
  }
};
