const themeService = require("../services/theme");
const _throw = require("../utils/throw");

exports.findAll = async (req, res) => {
  const themesList = await themeService.findAll();

  res.status(200).json({ datas: themesList });
};

exports.addTheme = async (req, res) => {
  try {
    const result = await themeService.addTheme(req.body);

    result.rowCount > 0
      ? res.status(201).json({ msg: "Created successfully" })
      : _throw("Echec created");
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  const id = +req.params.themeId;

  try {
    const result = await themeService.updateTheme(id, req.body);

    result.rowCount > 0
      ? res.status(200).json({ msg: "Updated successfully" })
      : _throw("Echec updated");
  } catch (error) {
    res.status(502).json({ errors: error.message });
  }
};

exports.deleteTheme = async (req, res) => {
  const id = +req.params.themeId;

  try {
    const result = await themeService.deleteTheme(id);

    result.rowCount > 0
      ? res.status(200).json({ msg: "Deleted successfully" })
      : _throw("Deleted failed");
  } catch (error) {
    res.status(502).json({ errors: error.message });
  }
};
