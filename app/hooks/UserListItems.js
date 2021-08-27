import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import Text from "../components/CustomText";
import alliance from "../../assets/alliance.png";
import horde from "../../assets/horde.png";
import { Fraction } from "../model/User";
import HeaderText from "../components/CustomTextHeader";

const useListItems = (users, viewDetails) => {
  const getFraction = (fraction) => {
    return fraction == Fraction.HORDE ? horde : alliance;
  };

  return users.map((user) => (
    <TouchableOpacity key={user.id} onPress={() => viewDetails(user.id)}>
      <View style={styles.row}>
        <View>
          <Image
            source={getFraction(user.fraction)}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.verticalContainer}>
          <HeaderText>{user.username}</HeaderText>
          <View>
            <Text>{user.playerClass}</Text>
            <Text>{user.level}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  verticalContainer: {
    marginVertical: 5,
    justifyContent: "space-evenly",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
  },
  sectionLine: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
});

export default useListItems;
