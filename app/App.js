import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useRoutes from "./routes/routes";
import usersModel from "./model/UsersModel";
import { useUsers } from "./context/UserContext";

export default function App() {
  const routes = useRoutes();
  const { users, setUsers } = useUsers();
  usersModel.setUsersState(users, setUsers);

  useEffect(() => {
    console.log("in useEffect");
    return usersModel.loadUsers();
  }, []);

  return <NavigationContainer>{routes}</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
