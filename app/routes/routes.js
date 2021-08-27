import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import MapScreen from "../screens/Map";
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
import SettingsScreen from "../screens/Settings";
import { useAuth } from "../context/AuthContext";
import DetailsScreen from "../screens/Details";
import EditScreen from "../screens/Edit";
import CoordinatesPicker from "../components/CoordinatesPicker";
import { useSettings } from "../context/SettingsContext";
import { useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabbedScreen = () => {
  const { color, isDarkTheme, localize } = useSettings();
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      activeColor={color}
      inactiveColor="grey"
      barStyle="grey"
      barStyle={{ backgroundColor: isDarkTheme ? "#494949" : "#e0e0e0" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: localize("Home"),
          tabBarIcon: "home",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: localize("Map"),
          tabBarIcon: "map",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: localize("Settings"),
          tabBarIcon: "account-settings-outline",
        }}
      />
    </Tab.Navigator>
  );
};

const useRoutes = () => {
  const { color, isDarkTheme, localize } = useSettings();
  const signup = localize("Sign up");
  const { auth } = useAuth();
  if (!auth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: localize("Sign in"),
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: localize("Sign up"),
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabbedScreen}
        options={{
          title: "Wow players",
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: localize("Details"),
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          title: localize("Edit"),
        }}
      />
      <Stack.Screen
        name="CoordinatesPicker"
        component={CoordinatesPicker}
        options={{
          title: localize("Coordinates"),
        }}
      />
    </Stack.Navigator>
  );
};

export default useRoutes;
