const db = require("../utils/database");

exports.login = async (email) => {
  return await db.query(`SELECT * FROM user_entity WHERE email = $1`, [email]);
};

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

exports.findOneByUsername = async (username) => {
  return await db.query(`SELECT * FROM user_entity WHERE username = $1`, [
    username,
  ]);
};

exports.updateUserValidate = async (username, validate) => {
  return await db.query(
    `UPDATE user_entity SET validate = $1 WHERE username = $2`,
    [validate, username]
  );
};
