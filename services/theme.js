const themeRepository = require("../repository/theme");
const _throw = require("../utils/throw");

/**
 * @param { Boolean } admin
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.findAll = async (admin) => {
  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  const result = (await themeRepository.findAll()).rows;

  return { codeStatus: 200, datas: result };
};

/**
 * @param { Object } body
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.addTheme = async (body) => {
  const { name, user } = body;
  const { admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await themeRepository.addTheme(name);

    if (result.rowCount === 0) _throw("Echec created");

    return { codeStatus: 201, msg: "Created successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};

/**
 * @param { Number } id
 * @param { Object } body
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.updateTheme = async (id, body) => {
  const { name, user } = body;
  const { admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await themeRepository.updateTheme(id, name);

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
exports.deleteTheme = async (id, admin) => {
  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await themeRepository.deleteTheme(id);

    if (result.rowCount === 0) _throw("Deleted failed");

    return { codeStatus: 200, msg: "Deleted successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};
