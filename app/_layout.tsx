import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Only one NavigationContainer at the root of the app
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: () => null,
          headerShown: false,
          animation: "none"
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          headerShown: false,
          animation: "none"
        }}
      />
    </Stack.Navigator>
  );
}
