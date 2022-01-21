const articleService = require("../services/article");
const _throw = require("../utils/throw");

exports.findAll = async (req, res) => {
  const articlesList = await articleService.findAll();

  res.status(200).json({ datas: articlesList });
};

exports.findAllByThemeId = async (req, res) => {
  const themeId = +req.params.themeId;

  const articlesList = await articleService.findAllByThemeId(themeId);

  res.status(200).json({ datas: articlesList });
};

exports.findOneById = async (req, res) => {
  const id = +req.params.articleId;
  const article = await articleService.findOneById(id);

  res.status(200).json({ datas: article });
};

exports.addArticle = async (req, res) => {
  try {
    const result = await articleService.addArticle(req.body);

    result.rowCount > 0
      ? res.status(201).json({ msg: "Created successfully" })
      : _throw("Echec created");
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  const articleId = +req.params.articleId;

  try {
    const result = await articleService.updateArticle(articleId, req.body);

    result.rowCount > 0
      ? res.status(200).json({ msg: "Updated successfully" })
      : _throw("Updated failed");
  } catch (error) {
    res.status(502).json({ errors: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const id = +req.params.articleId;

  try {
    const result = await articleService.deleteArticle(id);

    result.rowCount > 0
      ? res.status(200).json({ msg: "Deleted successfully" })
      : _throw("Deleted failed");
  } catch (error) {
    res.status(502).json({ errors: error.message });
  }
};
