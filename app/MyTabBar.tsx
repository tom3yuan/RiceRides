import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  const middle = 2

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        {/*
        if (index === middle) {
          return (
            <View key="spacer" style={{ width: 10 }} />
          );
        }
        */}
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const icons = {
          Home: require('../assets/images/home.png'),
          Service: require('../assets/images/services.png'),
          Order: require('../assets/images/orders.png'),
          Account: require('../assets/images/account.png'),
        };

        const isFocused = state.index === index;


        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });



          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        if (route.name === 'Rent') {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: "#6b8e7a" }}
            ></Pressable>
          )
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: "#6b8e7a" }}
          >
            <View style={{ position: 'relative', width: 74, height: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
              <View style={[StyleSheet.absoluteFillObject, { top: -6, borderRadius: 32, backgroundColor: isFocused ? '#000000' : 'transparent' }]} />
              <Image
                source={icons[route.name]} // Replace with your image path
                style={{
                  width: route.name === 'Service' ? 30 : 25,
                  height: route.name === 'Service' ? 35 : 29,
                  marginBottom: 6,
                  tintColor: isFocused ? '#6b8e7a' : '#000000', // Optional: tint image like an icon
                  resizeMode: 'contain'
                }}
              />
            </View>
            <Text style={{ color: "#000000", fontWeight: 'bold' }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
