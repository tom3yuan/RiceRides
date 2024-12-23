import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'

import MapView from 'react-native-maps';

const HomeScreen = ({ navigation }: { navigation: any }) => {

    const check = async () => {
        console.log(GoogleSignin.getCurrentUser())
    }
    return (
    <View style={styles.container}>
        <View className="absolute top-16 left-10 m-4 justify-center">
                <Text className="text-4xl text-lg font-bold">Welcome Back!</Text>
        </View>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centers map vertically
        alignItems: 'center',    // Centers map horizontally
    },
    map: {
        width: '70%', // Adjust as needed
        height: '60%',
    },
})
export default HomeScreen;
