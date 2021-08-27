import React from "react";
import { LogBox } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { SettingsProvider } from "./context/SettingsContext";
import App from "./App";

LogBox.ignoreAllLogs();

const AppContext = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppContext;
