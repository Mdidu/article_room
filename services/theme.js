const themeRepository = require("../repository/theme");

exports.findAll = async () => {
  const result = await themeRepository.findAll();

  return result.rows;
};

exports.addTheme = async (body) => {
  const name = body.name;
  return await themeRepository.addTheme(name);
};

exports.updateTheme = async (id, body) => {
  const name = body.name;

  return await themeRepository.updateTheme(id, name);
};

exports.deleteTheme = async (id) => {
  return await themeRepository.deleteTheme(id);
};
