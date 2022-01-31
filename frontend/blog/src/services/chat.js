import { baseUrl, headers, headerAuth } from "../config/httpRequest";

const findAllChat = async () => {
  return await fetch(`${baseUrl}/chat`, {
    method: "GET",
    headers,
  });
};

const addChat = async (message) => {
  return await fetch(`${baseUrl}/chat`, {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
    headers: headerAuth,
  });
};

const deleteChat = async (id) => {
  return await fetch(`${baseUrl}/chat/${id}`, {
    method: "DELETE",
    headers: headerAuth,
  });
};

const chatServices = { findAllChat, addChat, deleteChat };

export default chatServices;
