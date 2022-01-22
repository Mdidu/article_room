const themeService = require("../services/theme");

/**
 * @code 200
 * @code 403
 */
exports.findAll = async (req, res) => {
  const admin = req.body.user.admin;

  const {
    codeStatus,
    msg,
    datas: themesList,
  } = await themeService.findAll(admin);

  codeStatus === 200
    ? res.status(codeStatus).json(themesList)
    : res.status(codeStatus).json({ msg });
};

/**
 * @code 201
 * @code 400
 * @code 403
 */
exports.addTheme = async (req, res) => {
  const { codeStatus, msg } = await themeService.addTheme(req.body);

  res.status(codeStatus).json({ msg });
};

/**
 * @code 200
 * @code 400
 * @code 403
 */
exports.updateTheme = async (req, res) => {
  const id = +req.params.themeId;

  const { codeStatus, msg } = await themeService.updateTheme(id, req.body);

  res.status(codeStatus).json({ msg });
};

/**
 * @code 200
 * @code 400
 * @code 403
 */
exports.deleteTheme = async (req, res) => {
  const id = +req.params.themeId;
  const admin = req.body.user.admin;

  const { codeStatus, msg } = await themeService.deleteTheme(id, admin);

  res.status(codeStatus).json({ msg });
};
