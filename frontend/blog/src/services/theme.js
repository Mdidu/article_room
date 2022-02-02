import { baseUrl, headerAuth } from "../config/httpRequest";

const findAllTheme = async () => {
  headerAuth.Authorization = `Bearer ${localStorage.getItem("access_token")}`;

  return await fetch(`${baseUrl}/theme`, {
    method: "GET",
    headers: headerAuth,
  });
};

const addTheme = async ({ name }) => {
  headerAuth.Authorization = `Bearer ${localStorage.getItem("access_token")}`;

  return await fetch(`${baseUrl}/theme`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
    }),
    headers: headerAuth,
  });
};

const updateTheme = async (id, { name }) => {
  headerAuth.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return await fetch(`${baseUrl}/theme/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
    }),
    headers: headerAuth,
  });
};

const deleteTheme = async (id) => {
  headerAuth.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return await fetch(`${baseUrl}/theme/${id}`, {
    method: "DELETE",
    headers: headerAuth,
  });
};

const themeServices = { findAllTheme, addTheme, updateTheme, deleteTheme };

export default themeServices;
