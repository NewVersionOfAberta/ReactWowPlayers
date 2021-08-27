import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "../components/CustomText";
import { useAuth } from "../context/AuthContext";
import usersModel from "../model/UsersModel";
import { Fraction, Race, PlayerClass, User } from "../model/User";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";
import TextInput from "../components/CustomTextInput";
import Button from "../components/CustomButton";
import { useSettings } from "../context/SettingsContext";

export default SignUpScreen = (props) => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    fraction: Fraction.HORDE,
    race: Race.ORC,
    playerClass: PlayerClass.SHAMAN,
    level: 0,
    gear: 0,
    realWorldName: "",
    country: "",
    city: "",
    age: "",
  });

  const { isDarkTheme, color, localize } = useSettings();

  const [message, setMessage] = useState("");

  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  const signUp = async () => {
    //const user = User.fromData(form);
    const message = await usersModel.register(form, login);
    setMessage(message);
  };

  const pickerFractions = usePickerItems(Object.values(Fraction));
  const pickerClass = usePickerItems(Object.values(PlayerClass));
  const pickerRace = usePickerItems(Object.values(Race));

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("username", val)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("password", val)}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("email", val)}
        />
        <View style={styles.sectionLine}>
          <Picker
            selectedValue={form.fraction}
            dropdownIconColor={isDarkTheme ? "white" : "black"}
            style={{
              color: isDarkTheme ? "white" : "black",
            }}
            onValueChange={(itemValue, itemIndex) =>
              onChangeText("fraction", itemValue)
            }
          >
            {pickerFractions}
          </Picker>
        </View>
        <View style={styles.sectionLine}>
          <Picker
            selectedValue={form.race}
            dropdownIconColor={isDarkTheme ? "white" : "black"}
            style={{
              color: isDarkTheme ? "white" : "black",
            }}
            onValueChange={(itemValue, itemIndex) =>
              onChangeText("race", itemValue)
            }
          >
            {pickerRace}
          </Picker>
        </View>
        <View style={styles.sectionLine}>
          <Picker
            dropdownIconColor={isDarkTheme ? "white" : "black"}
            style={{
              color: isDarkTheme ? "white" : "black",
            }}
            mode="dropdown"
            selectedValue={form.playerClass}
            onValueChange={(itemValue, itemIndex) =>
              onChangeText("playerClass", itemValue)
            }
          >
            {pickerClass}
          </Picker>
        </View>
        <TextInput
          placeholder="Level"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("level", val)}
        />
        <TextInput
          placeholder="Gear"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("gear", val)}
        />
        <TextInput
          placeholder="Real name"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("realWorldName", val)}
        />
        <TextInput
          placeholder="Country"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("country", val)}
        />
        <TextInput
          placeholder="City"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("city", val)}
        />
        <TextInput
          placeholder="Age"
          autoCapitalize="none"
          onChangeText={(val) => onChangeText("age", val)}
        />
        <Text style={styles.baseText}>{message}</Text>
        <Button onPress={signUp} style={styles.signUpButton} mode="contained">
          {localize("Sign up")}
        </Button>
        {/* <Button title="Sign In" onPress={() => navigation.navigate("SignIn")} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  sectionLine: {
    marginVertical: 5,
  },
  signUpButton: {
    width: 290,
    marginBottom: 20,
    alignSelf: "center",
  },
});
