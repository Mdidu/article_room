const db = require("../utils/database");

exports.signup = async (email, username, password, roleId, validate) => {
  return await db.query(
    `INSERT INTO user_entity(email, username, password, role_id, validate) VALUES ($1, $2, $3, $4, $5)`,
    [email, username, password, roleId, validate]
  );
};

exports.getSignup = async (email, username) => {
  return await db.query(
    `SELECT email, username FROM user_entity WHERE email = $1 OR username = $2`,
    [email, username]
  );
};
