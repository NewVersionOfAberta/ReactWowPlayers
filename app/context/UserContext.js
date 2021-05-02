import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();
const { Provider } = UserContext;

export const useUsers = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return <Provider value={{ users, setUsers }}>{children}</Provider>;
};
