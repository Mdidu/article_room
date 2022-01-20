const db = require("../utils/database");

exports.findAll = async () => {
  const result = await db.query(`SELECT * FROM article`);

  return result.rows;
};

exports.findAllByThemeId = async (themeId) => {
  const result = await db.query(
    `SELECT * FROM article WHERE article.theme_id = $1`,
    [themeId]
  );

  return result.rows;
};

exports.findOneById = async (id) => {
  const result = await db.query(`SELECT * FROM article WHERE article.id = $1`, [
    id,
  ]);

  return result.rows;
};

exports.addArticle = async (body, createdAt) => {
  const { title, content, userId, themeId } = body;

  const result = await db.query(
    `INSERT INTO article(title, content, user_id, theme_id, created_at) VALUES ($1, $2, $3, $4, $5)`,
    [title, content, userId, themeId, createdAt]
  );

  return result;
};

exports.updateArticle = async (articleId, body) => {
  const { title, content, themeId } = body;
  
  const result = await db.query(
    `UPDATE article SET title = $1, content = $2, theme_id = $3 WHERE id = $4`,
    [title, content, themeId, articleId]
  );
  
  return result;
};

exports.deleteArticle = async (id) => {
  const result = await db.query(`DELETE FROM article WHERE article.id = $1`, [
    id,
  ]);
  return result;
};
