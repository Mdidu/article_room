const db = require("../utils/database");

exports.findAll = async () => {
  return await db.query(`SELECT * from theme`);
};

exports.addTheme = async (name) => {
  return await db.query(`INSERT INTO theme(name) VALUES($1)`, [name]);
};

exports.updateTheme = async (id, name) => {
  return await db.query(`UPDATE theme SET name = $1 WHERE id = $2`, [name, id]);
};

exports.deleteTheme = async (id) => {
  return await db.query(`DELETE FROM theme WHERE id = $1`, [id]);
};
