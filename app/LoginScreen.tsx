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
        if (!response.data?.user.email.toLowerCase().endsWith('@rice.edu')) {
          GoogleSignin.signOut();
          alert("Please use your Rice email to login")
        }
        else {
          await setUserInfo(response);
          console.log(response)
          console.log("User Info: ", response.data?.user.email)
          navigation.navigate("Main", {
            screen: "Home",
            params: {/* any params */ }
          });
        }
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


        <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}
        numberOfLines={1}>
        Login
      </Text>

      <TouchableOpacity onPress={signIn} style={styles.loginButtons}>
        <Image source={require('../assets/images/google.png')} style={styles.google} />
        <Text style={{ fontFamily: "Helvetica", fontSize: 16, }}>Sign in with Google</Text>

      </TouchableOpacity>
      <Button
        title="check current"
        onPress={check}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          if (userInfo.data?.user.email.toLowerCase().endsWith('@rice.edu')) {
            navigation.navigate("Home", { name: "Home" })
          }
          else {
            alert("Please use your Rice email to login")
            GoogleSignin.signOut();
          }
        }
        }
      />
      <Button
        title="sign out"
        onPress={() => {
          GoogleSignin.signOut();
        }
        }
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: "#FFFFFF"
  },
  icon: { //make sure it is transparent
    width: 150,
    height: 150,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150,
  },
  google: {
    width: 25,
    height: 25,
    marginRight: 10,
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
  signInText: {
    height: 34,
    backgroundColor: "#FF1111",
  },
  loginButtons: {
    marginTop: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#458dcc",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
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
