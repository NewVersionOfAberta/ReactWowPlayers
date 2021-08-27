import React, { useEffect } from "react";

import {
  NavigationContainer,
  DarkTheme as RNDarkTheme,
  DefaultTheme as RNDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as RNPDarkTheme,
  DefaultTheme as RNPDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import useRoutes from "./routes/routes";
import usersModel from "./model/UsersModel";
import { useUsers } from "./context/UserContext";
import { useSettings } from "./context/SettingsContext";

export default function App() {
  const routes = useRoutes();
  const { users, setUsers } = useUsers();
  usersModel.setUsersState(users, setUsers);
  const { color, isDarkTheme } = useSettings();
  const customDefaultTheme = {
    ...RNPDefaultTheme,
    colors: { ...RNPDefaultTheme.colors, primary: color, accent: color },
  };

  const customDarkTheme = {
    ...RNPDarkTheme,
    colors: { ...RNPDarkTheme.colors, primary: color, accent: color },
  };

  useEffect(() => {
    return usersModel.loadUsers();
  }, []);

  return (
    <NavigationContainer theme={isDarkTheme ? RNDarkTheme : RNDefaultTheme}>
      <PaperProvider theme={isDarkTheme ? customDarkTheme : customDefaultTheme}>
        {routes}
      </PaperProvider>
    </NavigationContainer>
  );
}
