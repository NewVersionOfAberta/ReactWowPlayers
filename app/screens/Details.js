import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "../components/CustomText";
import usersModel from "../model/UsersModel";
import { Divider } from "react-native-paper";
import Button from "../components/CustomButton";
import { useSettings } from "../context/SettingsContext";
import VideoDisplayer from "../components/VideoDisplayer";
import ImageDisplayer from "../components/ImageDisplayer";
import CoordinatesDisplayer from "../components/CoordinatesDisplayer";

const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const user = usersModel.getUserById(id);
  const { color } = useSettings();
  const [image, setImage] = useState(null);
  console.log("Curr image", image);
  if (image !== null) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setImage(null);
          }}
        >
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <View title="Game">
        <Divider style={styles.divider} />
        <View style={styles.sectionContainer}>
          <Text style={{ color }}>Game</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Nickname</Text>
              <Text>{user.username}</Text>
            </View>

            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Fraction</Text>
              <Text>{user.fraction}</Text>
            </View>

            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Race</Text>
              <Text>{user.race}</Text>
            </View>
            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Class</Text>
              <Text>{user.playerClass}</Text>
            </View>
            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Level</Text>
              <Text>{user.level}</Text>
            </View>
            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Item level</Text>
              <Text>{user.gear}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ color }}>Real world</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Name</Text>
              <Text>{user.realWorldName}</Text>
            </View>

            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Country</Text>
              <Text>{user.country}</Text>
            </View>

            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>City</Text>
              <Text>{user.city}</Text>
            </View>

            <View style={styles.sectionLine}>
              <Text style={styles.fieldTitle}>Age</Text>
              <Text>{user.age}</Text>
            </View>
          </View>
        </View>
      </View>

      <CoordinatesDisplayer>{user}</CoordinatesDisplayer>

      <ImageDisplayer>{{ images: user.imageUrls, setImage }}</ImageDisplayer>
      <VideoDisplayer>{user.videoUrl}</VideoDisplayer>
      <Button
        style={{ color: color }}
        onPress={() => navigation.navigate("Edit", { user })}
      >
        {"Edit"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
  },
  divider: {
    marginVertical: 10,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  sectionContent: {
    marginHorizontal: 10,
  },
  fieldTitle: {
    opacity: 0.5,
  },
  sectionLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default DetailsScreen;
