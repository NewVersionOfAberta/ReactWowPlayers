import React from "react";
import { Picker } from "@react-native-picker/picker";

const usePickerItems = (items) => {
  return items.map((item) => (
    <Picker.Item key={item.toString()} label={item.toString()} value={item} />
  ));
};

export default usePickerItems;
