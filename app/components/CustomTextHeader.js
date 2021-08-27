import React from "react";
import { Text as PText } from "react-native-paper";
import { useSettings } from "../context/SettingsContext";

const HeaderText = (props) => {
  const children = props.children;
  const { fontSize, fontFamily, color, localize } = useSettings();
  return (
    <PText
      {...props}
      style={[
        { color: color, fontSize: fontSize + 5, fontFamily: fontFamily },
        props.style,
      ]}
    >
      {localize(children)}
    </PText>
  );
};

export default HeaderText;
