exports.findAll = async () => {
  return await fetch("http://localhost:8080/theme", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

exports.update = async (id, data) => {
  return await fetch(`http://localhost:8080/theme/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: data.name,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

exports.delete = async (id) => {
  return await fetch(`http://localhost:8080/theme/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
