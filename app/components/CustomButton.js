import React from "react";
import { Button as PButton } from "react-native-paper";
import { useSettings } from "../context/SettingsContext";

const Button = (props) => {
  const { color, localize } = useSettings();
  return <PButton {...props}>{localize(props.children)}</PButton>;
};

export default Button;
