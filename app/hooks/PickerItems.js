import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useSettings } from "../context/SettingsContext";

const usePickerItems = (items) => {
  const { localize } = useSettings();

  return items.map((item) => (
    <Picker.Item
      key={item.toString()}
      label={localize(item.toString())}
      value={item}
    />
  ));
};

export default usePickerItems;
