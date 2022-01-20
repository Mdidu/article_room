const db = require("../utils/database");

exports.findAll = async () => {
  return await db.query(`SELECT * FROM article`);
};

exports.findAllByThemeId = async (themeId) => {
  return await db.query(`SELECT * FROM article WHERE article.theme_id = $1`, [
    themeId,
  ]);
};

exports.findOneById = async (id) => {
  return await db.query(`SELECT * FROM article WHERE article.id = $1`, [id]);
};

exports.addArticle = async (title, content, userId, themeId, createdAt) => {
  return await db.query(
    `INSERT INTO article(title, content, user_id, theme_id, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [title, content, userId, themeId, createdAt]
  );
};

exports.updateArticle = async (articleId, title, content, themeId) => {
  return await db.query(
    `UPDATE article SET title = $1, content = $2, theme_id = $3 WHERE id = $4`,
    [title, content, themeId, articleId]
  );
};

exports.deleteArticle = async (id) => {
  return await db.query(`DELETE FROM article WHERE article.id = $1`, [id]);
};
