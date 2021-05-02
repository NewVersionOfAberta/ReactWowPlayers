import React from "react";
import { View, Button, ScrollView, StyleSheet, Text } from "react-native";
import usersModel from "../model/UsersModel";
const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const user = usersModel.getUserById(id);
  console.log("User details", user);
  return (
    <ScrollView>
      <View title="Game">
        <Text>{user.username}</Text>
        <Text>{user.fraction}</Text>
        <Text>{user.race}</Text>
        <Text>{user.playerClass}</Text>
        <Text>{user.level}</Text>
        <Text>{user.gear}</Text>
      </View>
      <View title="Game">
        <Text>{user.realWorldName}</Text>
        <Text>{user.country}</Text>
        <Text>{user.city}</Text>
        <Text>{user.age}</Text>
      </View>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("Edit", { user })}
      ></Button>
    </ScrollView>
  );
};

export default DetailsScreen;
