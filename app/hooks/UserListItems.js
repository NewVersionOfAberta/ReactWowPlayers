import React from "react";
import { TouchableOpacity, Text } from "react-native";

const useListItems = (users, viewDetails) => {
  console.log("func", viewDetails);
  return users.map((user) => (
    <TouchableOpacity key={user.id} onPress={() => viewDetails(user.id)}>
      <Text>{user.username}</Text>
      <Text>{user.fraction}</Text>
      <Text>{user.playerClass}</Text>
      <Text>{user.level}</Text>
    </TouchableOpacity>
  ));
};

export default useListItems;
