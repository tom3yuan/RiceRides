import { useState } from "react"
import { View, Button, Text, Image, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Dimensions } from "react-native";

import "../global.css"

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import Geolocation from '@react-native-community/geolocation';


GoogleSignin.configure();

export default function App({ navigation }: { navigation: any }) {

  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const [userInfo, setUserInfo] = useState(null);

  const [state, setState] = useState()
  const handleTapOutside = () => {
    Keyboard.dismiss()
  }
  
  const check = async () => {
    Geolocation.requestAuthorization()
    Geolocation.getCurrentPosition(info => console.log(info));
    console.log(GoogleSignin.getCurrentUser())
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUserInfo(response);
        console.log("teemov")
        console.log(userInfo.data?.user.email)
        console.log(GoogleSignin.getCurrentUser())
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const isSuccessResponse = (response) => response && response.data;
  const isErrorWithCode = (error) => error && error.code;
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


      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate("Home", { name: "Home" })
        }
      />
      <Button
        title="login"
        onPress={signIn}
      />
      <Button
        title="check current"
        onPress={check}
      />
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
