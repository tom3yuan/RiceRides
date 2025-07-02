import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  const middle = 2

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
            <View
              style={{
                backgroundColor: '#6b8e7a',
              }}
            >
              <Pressable
                onPress={onPress}
                style={({
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: '#E5E6E1',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -25,
                  marginLeft: 5,
                  marginRight: 5,
                })}
              >
                <Image
                  source={require('../assets/images/cross.png')}
                  style={{ width: 30, height: 30 }}
                />
              </Pressable>
            </View>
          )
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{flex: route.name === 'Home' || route.name === 'Account' ? 5 : 3, paddingTop: 15, paddingBottom: 15, paddingLeft: route.name === 'Home' ? 11 : 0, paddingRight: route.name === 'Account' ? 11 : 0, alignItems: 'center', backgroundColor: "#6b8e7a" }}


          >
            <View style={{
              position: 'relative',
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
              paddingHorizontal: 6,
            }}>
              <View style={{
                position: 'absolute',
                top: -7,
                width: 60,
                height: 40,
                borderRadius: 32,
                backgroundColor: isFocused ? '#000000' : 'transparent',
                zIndex: 2,
              }} />
              <Image
                source={icons[route.name]}
                style={{
                  width: route.name === 'Service' ? 30 : 25,
                  height: route.name === 'Service' ? 35 : 29,
                  marginBottom: 6,
                  tintColor: isFocused ? '#6b8e7a' : '#000000',
                  resizeMode: 'contain',
                  zIndex: 3,
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
