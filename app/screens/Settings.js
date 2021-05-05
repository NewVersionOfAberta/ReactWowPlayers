// import React from "react";
// import { View, TextInput, StyleSheet } from "react-native";
// import {
//   Button,
//   Text,
//   Switch,
//   TouchableRipple,
//   useTheme,
// } from "react-native-paper";
// import { Picker } from "@react-native-picker/picker";
// import usePickerItems from "../hooks/PickerItems";
// import { Language, useSettings } from "../context/SettingContext";

// const SettingsScreen = () => {
//   const {
//     language,
//     setLanguage,
//     fontFamily,
//     setFontFamily,
//     fontSize,
//     setFontSize,
//     color,
//     setColor,
//     isDarkTheme,
//     setIsDarkTheme,
//     localize,
//   } = useSettings();

//   const languages = usePickerItems(Object.values(Language));

//   return (
//     <View>
//       <Text>Language</Text>
//       <Picker
//         selectedValue={language}
//         onValueChange={(value) => {
//           setLanguage(value);
//         }}
//       >
//         {languages}
//       </Picker>
//       <Text>{localize("Color")}</Text>
//       <Picker></Picker>
//       <Text></Text>
//     </View>
//   );
// };

// export default SettingsScreen;
