import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  user: "",
  isLoggedIn: false,
  roleName: "",
  loginHandler: () => {},
  logoutHandler: () => {},
});

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("access_token");
  const initialUser = localStorage.getItem("user");
  const initialRole = localStorage.getItem("role");

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [role, setRole] = useState(initialRole);
  let roleName = role;
  let isLoggedIn = !!token;

  const loginHandler = (token, { username, roleName }) => {
    setToken(token);
    setUser(username);
    setRole(roleName);
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", username);
    localStorage.setItem("role", roleName);
  };

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  const contextValue = {
    token,
    user,
    isLoggedIn,
    roleName,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
