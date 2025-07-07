import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';


let currentPosition;
Geolocation.getCurrentPosition(
    (info) => {
        currentPosition = info;
        console.log("Current Position:", currentPosition);
    },
    (error) => {
        console.error("Error getting position:", error);
    }
);




const HomeScreen = ({ navigation }: { navigation: any }) => {
    const check = async () => {
        console.log(GoogleSignin.getCurrentUser())
    }
    const update = () => {
        Geolocation.getCurrentPosition(
            (info) => {
                currentPosition = info;
                console.log("Current Position:", currentPosition);
            },
            (error) => {
                console.error("Error getting position:", error);
            }
        );
    }

    return (
        <View style={styles.container}>
            <View className="absolute top-16 left-10 m-4 justify-center">
                <Text className="text-4xl text-lg font-bold">Welcome Back, {GoogleSignin.getCurrentUser()["user"]["email"]}</Text>
            </View>
            <View>
                <Text>
                    Hello
                </Text>
            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={{ latitude: 37.34, longitude: -122.1 }}
                />
            </MapView>
            <Button
                title="check current"
                onPress={update}
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
