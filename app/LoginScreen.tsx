import React from "react"
import { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Dimensions } from "react-native";
import "../global.css"

export default function App() {

  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const handleTapOutside = () => {
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>


      <TouchableWithoutFeedback onPress={handleTapOutside}>
        <View style={[styles.wrapper, { width, height }]} onLayout={() => setSize(Dimensions.get('window'))} />
      </TouchableWithoutFeedback>
      <View style={styles.icon}>


        <Image source={require('../assets/images/Screenshot 2024-11-17 200241.png')} />
      </View>

      <Text style={styles.title}
        numberOfLines={1}>
        Login
      </Text>
          <TextInput
            style={styles.textbox}
            placeholder="email"
            inputMode="email"
            keyboardType="default"
          />
          <TextInput
            style={styles.textbox}
            placeholder="password"
            keyboardType="default"
          />

      {/*}<View className="flex-1 bg-gray-200 justify-center items-center">
          <Text className="text-lg font-bold text-blue-500">Hello NativeWind!</Text>
        </View>{*/}
      <View
        style={styles.passwordContainer}>
        <TouchableOpacity
          style={styles.passwordButton}
        >

          <Text>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButtons}
      >

        <Text>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}
      >
        <Text>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ //colors to make views more clear during coding
  background: {
    backgroundColor: 'transparent', // Invisible background
    opacity: 0, // Makes the component invisible}
  },
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100
  },
  wrapper: {
    position: "absolute",
    justifyContent: "center", // Centers the text inputs vertically
    alignItems: "center", // Centers the text inputs horizontally
    backgroundColor: "transparent", // Optional background color for better visibility
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30, //download react library responsive font size later...
    paddingVertical: 50,
    backgroundColor: "#34ebab"
  },
  icon: { //make sure it is transparent
    width: 150,
    height: 150,
    backgroundColor: "#008000",
    alignItems: 'center',
    justifyContent: 'center'
  },
  textbox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    backgroundColor: "#347aeb",
    borderRadius: 10
  },
  buttons: {
    padding: 10,
    margin: 12,
    backgroundColor: "#ebeb34",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  loginButtons: {
    marginTop: 50,
    padding: 10,
    margin: 12,
    backgroundColor: "#ebeb34",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  passwordButton: {
    padding: 2,
    margin: 2,
    textAlign: "right",
    justifyContent: 'flex-end'
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#eba234",
    width: 300
  }
})