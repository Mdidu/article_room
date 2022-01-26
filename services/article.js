const articleRepository = require("../repository/article");
const _throw = require("../utils/throw");

/**
 * @return { Promise<Array> }
 */
exports.findAll = async () => {
  const result = await articleRepository.findAll();

  return result.rows;
};

/**
 * @param { Number } themeId
 * @return { Promise<Array> }
 */
exports.findAllByThemeId = async (themeId) => {
  const result = await articleRepository.findAllByThemeId(themeId);

  return result.rows;
};

/**
 * @param { Number } id
 * @return { Promise<Object> }
 */
exports.findOneById = async (id) => {
  const result = await articleRepository.findOneById(id);

  return result.rows[0];
};

/**
 * @param { Object } body
 * @return { Promise<{codeStatus: Number, msg: String, articleId: Number}> }
 */
exports.addArticle = async (body) => {
  const { title, content, themeId, user } = body;
  const { id: userId, admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  const createdAt = new Date();

  try {
    const result = await articleRepository.addArticle(
      title,
      content,
      userId,
      themeId,
      createdAt
    );

    if (result.rowCount === 0) _throw("Echec created");

    const articleId = result.rows[0].id;

    return { codeStatus: 201, msg: "Created successfully", articleId };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};

/**
 * @param { Number } articleId
 * @param { Object } body
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.updateArticle = async (articleId, body) => {
  const { title, content, themeId, user } = body;
  const { admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await articleRepository.updateArticle(
      articleId,
      title,
      content,
      themeId
    );

    if (result.rowCount === 0) _throw("Updated failed");

    return { codeStatus: 200, msg: "Updated successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};

/**
 * @param { Number } id
 * @param { Boolean } admin
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.deleteArticle = async (id, admin) => {
  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await articleRepository.deleteArticle(id);

    if (result.rowCount === 0) _throw("Deleted failed");

    return { codeStatus: 200, msg: "Deleted successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};
