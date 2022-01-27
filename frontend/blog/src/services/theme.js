import { baseUrl, headerAuth } from "../config/httpRequest";

const findAllTheme = async () => {
  return await fetch(`${baseUrl}/theme`, {
    method: "GET",
    headers: headerAuth,
  });
};

const updateTheme = async (id, data) => {
  return await fetch(`${baseUrl}/theme/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: data.name,
    }),
    headers: headerAuth,
  });
};

const deleteTheme = async (id) => {
  return await fetch(`${baseUrl}/theme/${id}`, {
    method: "DELETE",
    headers: headerAuth,
  });
};

const themeServices = { findAllTheme, updateTheme, deleteTheme };

export default themeServices;
