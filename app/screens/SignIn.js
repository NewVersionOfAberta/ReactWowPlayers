import React from "react";
import { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import usersModel from "../model/UsersModel";
import { useAuth } from "../context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const enter = async () => {
    const message = await usersModel.authorize(
      form.email,
      form.password,
      login
    );
    setMessage(message);
  };

  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("email", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("password", val)}
      />
      <Text>{message}</Text>
      <Button title="Sign in" onPress={enter}></Button>
      <Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
    </View>
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

export default SignInScreen;
