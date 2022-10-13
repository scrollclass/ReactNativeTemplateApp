/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import {
  RootStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import PinScreen from "../screens/PinScreen";
import CreatePinScreen from "../screens/CreatePinScreen";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import { useAuthenticationStatus } from "@nhost/react";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="App"
          component={AppStack}
        />
      )}
    </Stack.Navigator>
  );
}