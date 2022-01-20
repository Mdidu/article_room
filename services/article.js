const db = require("../utils/database");

exports.findAll = async () => {
  const result = await db.query({
    text: `SELECT * FROM chat`,
  });

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
