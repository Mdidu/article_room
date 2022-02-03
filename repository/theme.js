const db = require("../utils/database");

/**
 * @return { Promise<QueryResult<any>> }
 */
exports.findAll = async () => {
  return await db.query(`SELECT * from theme`);
};

/**
 * @param { String } name
 * @return { Promise<QueryResult<any>> }
 */
exports.addTheme = async (name) => {
  return await db.query(`INSERT INTO theme(name) VALUES($1)`, [name]);
};

/**
 * @param { Number } id
 * @param { String } name
 * @return { Promise<QueryResult<any>> }
 */
exports.updateTheme = async (id, name) => {
  return await db.query(`UPDATE theme SET name = $1 WHERE id = $2`, [name, id]);
};

/**
 * @param { Number } id
 * @return { Promise<QueryResult<any>> }
 */
exports.deleteTheme = async (id) => {
  return await db.query(`DELETE FROM theme WHERE id = $1`, [id]);
};
