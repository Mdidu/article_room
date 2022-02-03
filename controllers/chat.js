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

  await chatService.addChat(message, user);
};
