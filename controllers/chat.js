const chatService = require("../services/chat");
const io = require("../socket");
const { decodingJWT } = require("../utils/jwtDecoding");

exports.findAllChat = async () => {
  const chatMessageList = await chatService.findAllChat();

  io.getIO().emit("getMessage", {
    action: "read",
    chatMessageList,
  });
};

exports.addChat = async ({ message, token }) => {
  const user = decodingJWT(token);

  const { msg } = await chatService.addChat(message, user);

  const chatMessageList = await chatService.findAllChat();

  io.getIO().emit("getMessage", {
    action: "create",
    post: msg,
    chatMessageList,
  });
};

exports.deleteChatMessage = async ({ messageId, token }) => {
  const user = decodingJWT(token);

  const { msg } = await chatService.deleteChatMessage(+messageId, user);

  const chatMessageList = await chatService.findAllChat();

  io.getIO().emit("getMessage", {
    action: "delete",
    post: msg,
    chatMessageList,
  });
};
