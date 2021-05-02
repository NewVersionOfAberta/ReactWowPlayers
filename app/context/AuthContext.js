import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [userId, setUserId] = useState(null);

  const login = (id) => {
    setAuth(true);
    setUserId(id);
    console.log("login", auth);
  };

  const logout = () => {
    setAuth(false);
    setUserId(null);
  };

  return (
    <Provider value={{ auth, userId, login, logout }}>{children}</Provider>
  );
};
