const articleService = require("../services/article");

exports.findAll = async (req, res) => {
  const articlesList = await articleService.findAll();

  res.status(200).json({ datas: articlesList });
};
