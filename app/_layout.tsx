import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";
import HomeTabs from "./HomeTabs";
import PersonalScreen from "./PersonalScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Main"
          component={HomeTabs}
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalScreen}
          options={{
            animation: "none",
          }}/>
      </Stack.Navigator>
  );
}
