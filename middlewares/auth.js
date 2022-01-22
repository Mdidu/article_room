const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ errors: "Token is missing !" });

  try {
    const token = authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ errors: `Invalid token : ${error.message}` });
  }
};
