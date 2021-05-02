import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import usersModel from "../model/UsersModel";
import { Fraction, Race, PlayerClass, User } from "../model/User";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";

export default SignUpScreen = ({ navigation }) => {
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
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("password", val)}
        />
        <TextInput
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
          style={styles.input}
          placeholder="Level"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("level", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Gear"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("gear", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Real name"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("realWorldName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("country", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("city", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("age", val)}
        />
        <Text style={styles.baseText}>{message}</Text>
        <Button title="Sign Up" onPress={signUp} />
        {/* <Button title="Sign In" onPress={() => navigation.navigate("SignIn")} /> */}
      </View>
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
