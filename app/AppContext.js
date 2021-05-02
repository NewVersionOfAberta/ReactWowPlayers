import React from "react";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";

const AppContext = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  );
};

export default AppContext;
