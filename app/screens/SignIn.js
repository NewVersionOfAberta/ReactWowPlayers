import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/CustomText";
import usersModel from "../model/UsersModel";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "react-native-paper";
import { useSettings } from "../context/SettingsContext";
import TextInput from "../components/CustomTextInput";
import Button from "../components/CustomButton";

const SignInScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { localize } = useSettings();

  const { login } = useAuth();
  const theme = useTheme();
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        value={form.email}
        mode="outlined"
        onChangeText={(val) => onChangeText("email", val)}
        placeholder={localize("Email")}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        placeholder={localize("Password")}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(val) => onChangeText("password", val)}
      />
      <Text>{message}</Text>
      <Button mode="contained" onPress={enter}>
        {localize("Sign in")}
      </Button>
      <Button title="Sign up" onPress={() => navigation.navigate("SignUp")}>
        {localize("Sign up")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 10,
  },
});

export default SignInScreen;
