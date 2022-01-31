const db = require("../utils/database");

/**
 * @return { Promise<QueryResult<any>> }
 */
exports.findAllChat = async () => {
  return await db.query(`SELECT chat.*, user_entity.username
	FROM chat LEFT JOIN user_entity ON user_entity.id = chat.user_id`);
};

/**
 * @param { String } content
 * @param { Number } userId
 * @param { Number } createdAt
 * @return { Promise<QueryResult<any>> }
 */
exports.addChat = async (content, userId, createdAt) => {
  return await db.query(
    "INSERT INTO chat (content, created_at, user_id) VALUES ($1, $2, $3)",
    [content, createdAt, userId]
  );
};
