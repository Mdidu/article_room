const db = require("../utils/database");

/**
 * @return { Promise<QueryResult<any>> }
 */
exports.findAll = async () => {
  return await db.query(`SELECT * FROM article`);
};

/**
 * @param { Number } themeId
 * @return { Promise<QueryResult<any>> }
 */
exports.findAllByThemeId = async (themeId) => {
  return await db.query(`SELECT * FROM article WHERE article.theme_id = $1`, [
    themeId,
  ]);
};

/**
 * @param { Number } id
 * @return { Promise<QueryResult<any>> }
 */
exports.findOneById = async (id) => {
  return await db.query(
    `SELECT article.*, name FROM article LEFT JOIN theme ON theme.id = article.theme_id WHERE article.id = $1`,
    [id]
  );
};

/**
 * @param { String } title
 * @param { String } content
 * @param { Number } userId
 * @param { Number } themeId
 * @param { Number } createdAt
 * @return { Promise<QueryResult<any>> }
 */
exports.addArticle = async (title, content, userId, themeId, createdAt) => {
  return await db.query(
    `INSERT INTO article(title, content, user_id, theme_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [title, content, userId, themeId, createdAt]
  );
};

/**
 * @param { Number } articleId
 * @param { String } title
 * @param { String } content
 * @param { Number } themeId
 * @return { Promise<QueryResult<any>> }
 */
exports.updateArticle = async (articleId, title, content, themeId) => {
  return await db.query(
    `UPDATE article SET title = $1, content = $2, theme_id = $3 WHERE id = $4`,
    [title, content, themeId, articleId]
  );
};

/**
 * @param { Number } id
 * @return { Promise<QueryResult<any>> }
 */
exports.deleteArticle = async (id) => {
  return await db.query(`DELETE FROM article WHERE article.id = $1`, [id]);
};
