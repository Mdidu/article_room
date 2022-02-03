const articleService = require("../services/article");

/**
 * @code 200
 */
exports.findAll = async (req, res) => {
  const articlesList = await articleService.findAll();

  res.status(200).json(articlesList);
};

/**
 * @code 200
 */
exports.findAllByThemeId = async (req, res) => {
  const themeId = +req.params.themeId;

  const articlesList = await articleService.findAllByThemeId(themeId);

  res.status(200).json(articlesList);
};

/**
 * @code 200
 */
exports.findOneById = async (req, res) => {
  const id = +req.params.articleId;
  const article = await articleService.findOneById(id);

  res.status(200).json(article);
};

/**
 * @code 201
 * @code 400
 * @code 403
 */
exports.addArticle = async (req, res) => {
  const { codeStatus, msg, articleId } = await articleService.addArticle(
    req.body
  );

  codeStatus === 201
    ? res.status(codeStatus).json({ msg, articleId })
    : res.status(codeStatus).json({ msg });
};

/**
 * @code 200
 * @code 400
 * @code 403
 */
exports.updateArticle = async (req, res) => {
  const articleId = +req.params.articleId;

  const { codeStatus, msg } = await articleService.updateArticle(
    articleId,
    req.body
  );

  codeStatus === 200
    ? res.status(codeStatus).json({ msg, articleId })
    : res.status(codeStatus).json({ msg });
};

/**
 * @code 200
 * @code 400
 * @code 403
 */
exports.deleteArticle = async (req, res) => {
  const id = +req.params.articleId;
  const admin = req.body.user.admin;

  const { codeStatus, msg } = await articleService.deleteArticle(id, admin);

  res.status(codeStatus).json({ msg });
};
