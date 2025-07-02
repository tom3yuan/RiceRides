import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";
import HomeTabs from "./HomeTabs";
// remove HomeScreen and MapScreen from here, since they're now in HomeTabs

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: () => null,
            animation: "none",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  );
}
