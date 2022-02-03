exports.baseUrl = "http://localhost:8080";

exports.headers = {
  "Content-Type": "application/json",
};

exports.headerAuth = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
