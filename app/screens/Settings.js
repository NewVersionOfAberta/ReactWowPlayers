import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Text from "../components/CustomText";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";
import { Language, useSettings } from "../context/SettingsContext";
import Button from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import Slider from "@react-native-community/slider";

const SettingsScreen = () => {
  const {
    language,
    setLanguage,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    color,
    setColor,
    isDarkTheme,
    setIsDarkTheme,
    localize,
  } = useSettings();

  const { logout } = useAuth();

  const languages = usePickerItems(Object.values(Language));

  return (
    <View>
      <Text style={{ ...styles.fieldTitle, color }}>Language</Text>
      <Picker
        dropdownIconColor={isDarkTheme ? "white" : "black"}
        style={{
          color: isDarkTheme ? "white" : "black",
        }}
        selectedValue={language}
        onValueChange={(value) => {
          setLanguage(value);
        }}
      >
        {languages}
      </Picker>
      <Text style={{ ...styles.fieldTitle, color }}>Color</Text>
      <Picker
        dropdownIconColor={isDarkTheme ? "white" : "black"}
        style={{
          color: isDarkTheme ? "white" : "black",
        }}
        selectedValue={color}
        onValueChange={(value) => {
          setColor(value);
        }}
      >
        <Picker.Item label={localize("Orange")} value="#fb8c00" />
        <Picker.Item label={localize("Grey")} value="#607d8b" />
        <Picker.Item label={localize("Green")} value="#689f38" />
        <Picker.Item label={localize("Red")} value="#e64a19" />
        <Picker.Item label={localize("Blue")} value="#1976d2" />
      </Picker>
      <Text style={{ ...styles.fieldTitle, color }}>Font name</Text>
      <Picker
        dropdownIconColor={isDarkTheme ? "white" : "black"}
        style={{
          color: isDarkTheme ? "white" : "black",
        }}
        selectedValue={fontFamily}
        onValueChange={(value) => setFontFamily(value)}
        mode="dropdown"
      >
        <Picker.Item label="Sans Serif" value="sans-serif" />
        <Picker.Item label="Serif" value="serif" />
        <Picker.Item label="Monospace" value="monospace" />
      </Picker>
      <Text style={{ ...styles.fieldTitle, color }}>Theme</Text>
      <Picker
        dropdownIconColor={isDarkTheme ? "white" : "black"}
        style={{
          color: isDarkTheme ? "white" : "black",
        }}
        selectedValue={isDarkTheme}
        onValueChange={(value) => setIsDarkTheme(value)}
        mode="dropdown"
      >
        <Picker.Item label={localize("Dark")} value={true} />
        <Picker.Item label={localize("Light")} value={false} />
      </Picker>
      <Text style={{ ...styles.fieldTitle, color }}>Font size</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={12}
        maximumValue={20}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#bdbdbd"
        value={fontSize}
        onValueChange={(value) => {
          setFontSize(value);
        }}
      />
      <Button onPress={logout}>Log out</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    opacity: 0.9,
  },
  container: {
    borderWidth: 1,
  },
  sectionLine: {
    marginVertical: 5,
  },
  button: {
    width: 290,
    marginBottom: 20,
    alignSelf: "center",
  },
  coordinatesEdit: {
    display: "flex",
    flexDirection: "row",
  },
});

export default SettingsScreen;
