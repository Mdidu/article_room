const articleService = require("../services/article");

/**
 * SUCCESS 200
 */
exports.findAll = async (req, res) => {
  const articlesList = await articleService.findAll();

  res.status(200).json({ datas: articlesList });
};

/**
 * SUCCESS 200
 */
exports.findAllByThemeId = async (req, res) => {
  const themeId = +req.params.themeId;

  const articlesList = await articleService.findAllByThemeId(themeId);

  res.status(200).json({ datas: articlesList });
};

/**
 * SUCCESS 200
 */
exports.findOneById = async (req, res) => {
  const id = +req.params.articleId;
  const article = await articleService.findOneById(id);

  res.status(200).json({ datas: article });
};

/** Code status :
 * SUCCESS 201
 * ECHEC 400, 403
 */
exports.addArticle = async (req, res) => {
  const { codeStatus, msg } = await articleService.addArticle(req.body);

  res.status(codeStatus).json({ msg });
};

/** Code status :
 * SUCCESS 200
 * ECHEC 400, 403
 */
exports.updateArticle = async (req, res) => {
  const articleId = +req.params.articleId;

  const { codeStatus, msg } = await articleService.updateArticle(
    articleId,
    req.body
  );

  res.status(codeStatus).json({ msg });
};

/** Code status :
 * SUCCESS 200
 * ECHEC 400, 403
 */
exports.deleteArticle = async (req, res) => {
  const id = +req.params.articleId;
  const admin = req.body.user.admin;

  const { codeStatus, msg } = await articleService.deleteArticle(id, admin);

  res.status(codeStatus).json({ msg });
};
