const articleService = require("../services/article");
const _throw = require("../utils/throw");

exports.findAll = async (req, res) => {
  const articlesList = await articleService.findAll();

  res.status(200).json({ datas: articlesList });
};

exports.findAllByThemeId = async (req, res) => {
  const themeId = req.params.themeId;
  const articlesList = await articleService.findAllByThemeId(themeId);

  res.status(200).json({ datas: articlesList });
};

exports.findOneById = async (req, res) => {
  const id = req.params.articleId;
  const article = await articleService.findOneById(id);

  res.status(200).json({ datas: article });
};

exports.addArticle = async (req, res) => {
  const createdAt = new Date();

  try {
    const result = await articleService.addArticle(req.body, createdAt);

    result.rowCount > 0
      ? res.status(201).json({ msg: "Created successfully" })
      : _throw("Echec created");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
