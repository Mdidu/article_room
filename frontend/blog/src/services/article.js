import { baseUrl, headers, headerAuth } from "../config/httpRequest";

const findAll = async () => {
  return await fetch(`${baseUrl}/article`, {
    method: "GET",
    headers,
  });
};

const findOneById = async (articleId) => {
  return await fetch(`${baseUrl}/article/${articleId}`, {
    method: "GET",
    headers: headerAuth,
  });
};

const addArticle = async ({ title, theme }, content) => {
  return await fetch(`${baseUrl}/article`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content,
      themeId: +theme,
    }),
    headers: headerAuth,
  });
};

const updateArticle = async (id, { title, theme }, content) => {
  return await fetch(`${baseUrl}/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content,
      themeId: +theme,
    }),
    headers: headerAuth,
  });
};

const articleServices = { findAll, findOneById, addArticle, updateArticle };

export default articleServices;
