import React from "react";
import { SettingProvider } from "./context/SettingContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";

const AppContext = () => {
  return (
    <AuthProvider>
      <UserProvider>
        {/* <SettingProvider>{ <App /> }</SettingProvider> */}
      </UserProvider>
    </AuthProvider>
  );
};

export default AppContext;
