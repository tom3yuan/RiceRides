import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Only one NavigationContainer at the root of the app
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ title: 'Welcome' }}
        />
      </Stack.Navigator>
  );
}
