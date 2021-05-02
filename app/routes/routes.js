import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import MapScreen from "../screens/Map";
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";
import SettingsScreen from "../screens/Settings";
import { useAuth } from "../context/AuthContext";
import DetailsScreen from "../screens/Details";
import EditScreen from "../screens/Edit";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabbedScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      ></Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

const useRoutes = () => {
  const { auth } = useAuth();
  if (!auth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: "Sign in",
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: "Sign up",
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
          title: "Details",
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          title: "Edit",
        }}
      />
    </Stack.Navigator>
  );
};

export default useRoutes;
