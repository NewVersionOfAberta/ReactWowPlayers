import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import useListItems from "../hooks/UserListItems";
import { useUsers } from "../context/UserContext";

const HomeScreen = ({ navigation }) => {
  const { users } = useUsers();

  const viewDetails = (id) => {
    console.log("navigate");
    navigation.navigate("Details", { id });
  };
  const listItems = useListItems(users, viewDetails);
  return <ScrollView>{listItems}</ScrollView>;
};

export default HomeScreen;
