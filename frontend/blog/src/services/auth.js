import { baseUrl, headers } from "../config/httpRequest";

const signin = async ({ email, password }) => {
  return await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers,
  });
};

const signup = async ({ email, username, password }) => {
  return await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
    headers,
  });
};

const validateAccount = async (username) => {
  return await fetch(`${baseUrl}/auth/validate/${username}`, {
    method: "GET",
    headers,
  });
};

const authServices = { signin, signup, validateAccount };

export default authServices;
