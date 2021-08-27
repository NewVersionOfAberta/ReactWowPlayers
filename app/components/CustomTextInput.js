import React from "react";
import { TextInput as PTextInput } from "react-native-paper";
import { useSettings } from "../context/SettingsContext";

const TextInput = (props) => {
  const { fontSize, fontFamily, localize } = useSettings();
  const children = props.children;
  return (
    <PTextInput
      {...props}
      style={[
        {
          fontSize: fontSize,
          fontFamily: fontFamily,
          placeholderTextColor: "#000",
        },
        props.style,
      ]}
      placeholder={localize(props.placeholder)}
    >
      {children}
    </PTextInput>
  );
};

export default TextInput;
