const chatRepository = require("../repository/chat");
const _throw = require("../utils/throw");

/**
 * @return { Promise<Array> }
 */
exports.findAllChat = async () => {
  const result = await chatRepository.findAllChat();

  return result.rows;
};

/**
 * @param { String } content
 * @param { Object } user
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.addChat = async (content, user) => {
  const { id: userId, admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  const createdAt = new Date();

  try {
    const result = await chatRepository.addChat(content, userId, createdAt);

    if (result.rowCount === 0) _throw("Echec created");

    return { codeStatus: 201, msg: "Created successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};

/**
 * @param { Number } id
 * @param { Object } user
 * @return { Promise<{codeStatus: Number, msg: String}> }
 */
exports.deleteChatMessage = async (id, user) => {
  const { admin } = user;

  if (!admin) return { codeStatus: 403, msg: "Insufficient right !" };

  try {
    const result = await chatRepository.deleteChatMessage(id);

    if (result.rowCount === 0) _throw("Deleted failed");

    return { codeStatus: 201, msg: "Deleted successfully" };
  } catch (error) {
    return { codeStatus: 400, msg: error.message };
  }
};
