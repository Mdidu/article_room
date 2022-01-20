const articleRepository = require("../repository/article");

exports.findAll = async () => {
  const result = await articleRepository.findAll();

  return result.rows;
};

exports.findAllByThemeId = async (themeId) => {
  const result = await articleRepository.findAllByThemeId(themeId);

  return result.rows;
};

exports.findOneById = async (id) => {
  const result = await articleRepository.findOneById(id);

  return result.rows;
};

exports.addArticle = async (body) => {
  const { title, content, userId, themeId } = body;
  const createdAt = new Date();

  return await articleRepository.addArticle(
    title,
    content,
    userId,
    themeId,
    createdAt
  );
};

exports.updateArticle = async (articleId, body) => {
  const { title, content, themeId } = body;

  return await articleRepository.updateArticle(
    articleId,
    title,
    content,
    themeId
  );
};

exports.deleteArticle = async (id) => {
  return await articleRepository.deleteArticle(id);
};
