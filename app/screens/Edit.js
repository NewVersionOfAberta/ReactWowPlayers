import React, { useState } from "react";
import {
  View,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import usersModel from "../model/UsersModel";
import { Fraction, Race, PlayerClass, User } from "../model/User";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";
import useRoutes from "../routes/routes";

const ImageDisplayer = (displayedImages) => {
  return (
    <View>
      {displayedImages.map((displayedImage, index) => {
        return (
          <View key={index}>
            <View style={styles.imageLine}>
              <Image
                source={{
                  uri: displayedImage.imageUrl,
                }}
                style={styles.image}
              />

              <Button onPress={() => deleteImage(index)}>{"Delete"}</Button>
            </View>
            {index < displayedImages.length - 1 && <Divider />}
          </View>
        );
      })}
    </View>
  );
};

const EditScreen = ({ route }) => {
  const { user } = route.params;
  console.log(user);
  const [form, setForm] = useState({
    id: user.id,
    username: user.username,
    password: user.password,
    email: user.email,
    fraction: user.fraction,
    race: user.race,
    playerClass: user.playerClass,
    level: user.level,
    gear: user.gear,
    realWorldName: user.realWorldName,
    country: user.country,
    city: user.city,
    age: user.age,
    coordinates: user.coordinates,
    imageUrls: user.imageUrls,
    videoUrl: user.videoUrl,
  });

  const pickerFractions = usePickerItems(Object.values(Fraction));
  const pickerClass = usePickerItems(Object.values(PlayerClass));
  const pickerRace = usePickerItems(Object.values(Race));

  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  return (
    <ScrollView>
      <TextInput
        value={form.username}
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("username", val)}
      />
      <TextInput
        value={form.password}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("password", val)}
      />
      <TextInput
        value={form.email}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("email", val)}
      />
      <Picker
        style={styles.input}
        selectedValue={form.fraction}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("fraction", itemValue)
        }
      >
        {pickerFractions}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={form.race}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("race", itemValue)
        }
      >
        {pickerRace}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={form.playerClass}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("playerClass", itemValue)
        }
      >
        {pickerClass}
      </Picker>
      <TextInput
        value={form.level.toString()}
        style={styles.input}
        placeholder="Level"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("level", val)}
      />
      <TextInput
        value={form.gear.toString()}
        style={styles.input}
        placeholder="Gear"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("gear", val)}
      />
      <TextInput
        value={form.realWorldName}
        style={styles.input}
        placeholder="Real name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("realWorldName", val)}
      />
      <TextInput
        value={form.country}
        style={styles.input}
        placeholder="Country"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("country", val)}
      />
      <TextInput
        value={form.city}
        style={styles.input}
        placeholder="City"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("city", val)}
      />
      <TextInput
        value={form.age.toString()}
        style={styles.input}
        placeholder="Age"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("age", val)}
      />
      <Button title="Add image" onPress={handleAddImage}></Button>
      <Button
        title="Save"
        onPress={() => {
          usersModel.updateUser(User.fromData(form));
        }}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default EditScreen;
