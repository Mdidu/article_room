exports.findAll = async () => {
  return await fetch("http://localhost:8080/article", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

exports.findOneById = async (articleId) => {
  return await fetch(`http://localhost:8080/article/${articleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

exports.addArticle = async ({ title, theme }, content) => {
  return await fetch("http://localhost:8080/article", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content,
      themeId: +theme,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

exports.updateArticle = async (id, { title, theme }, content) => {
  return await fetch(`http://localhost:8080/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content,
      themeId: +theme,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
