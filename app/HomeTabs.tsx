import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import MyTabBar from './MyTabBar';
import ServiceScreen from "./ServiceScreen";
import AccountScreen from "./AccountScreen";
import RentScreen from "./RentScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Service" component={ServiceScreen} />
      <Tab.Screen name="Rent" component={RentScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
