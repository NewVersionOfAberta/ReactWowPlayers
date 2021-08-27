import React, { createContext, useState, useContext } from "react";
import en from "../localization/en.json";
import ru from "../localization/ru.json";

const SettingsContext = createContext();
const { Provider } = SettingsContext;

const locales = Object.freeze({
  English: en,
  Russian: ru,
});

export const Language = Object.freeze({
  English: "English",
  Russian: "Russian",
});

class SettingsDefaults {
  static language = Language.English;
  static fontFamily = "sans-serif";
  static fontSize = 18;
  static color = "orange";
  static isDarkTheme = true;
}

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState(SettingsDefaults.language);
  const [fontFamily, setFontFamily] = useState(SettingsDefaults.fontFamily);
  const [fontSize, setFontSize] = useState(SettingsDefaults.fontSize);
  const [color, setColor] = useState(SettingsDefaults.color);
  const [isDarkTheme, setIsDarkTheme] = useState(SettingsDefaults.isDarkTheme);

  const localize = (text) => {
    return locales[language][text] || text;
  };

  return (
    <Provider
      value={{
        language: language,
        setLanguage: setLanguage,
        fontFamily: fontFamily,
        setFontFamily: setFontFamily,
        fontSize: fontSize,
        setFontSize: setFontSize,
        color: color,
        setColor: setColor,
        isDarkTheme: isDarkTheme,
        setIsDarkTheme: setIsDarkTheme,
        localize: localize,
      }}
    >
      {children}
    </Provider>
  );
};
