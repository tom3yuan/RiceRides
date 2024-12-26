import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen({ navigation }: { navigation: any }) {

    const check = async () => {
        console.log(GoogleSignin.getCurrentUser())
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 7.78825,
                    longitude: -2.4324,
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
        width: '30%', // Adjust as needed
        height: '30%',
    },
})
