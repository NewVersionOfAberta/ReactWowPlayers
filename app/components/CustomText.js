import React from "react";
import { Text as PText } from "react-native-paper";
import { useSettings } from "../context/SettingsContext";

const Text = (props) => {
  const children = props.children;
  const { fontSize, fontFamily, localize } = useSettings();
  return (
    <PText
      {...props}
      style={[{ fontSize: fontSize, fontFamily: fontFamily }, props.style]}
    >
      {localize(children)}
    </PText>
  );
};

export default Text;
