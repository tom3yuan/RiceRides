import React from "react";
import { View, Text, Button, StyleSheet, Pressable, Image } from "react-native";
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
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'purple', borderWidth: 3, width: "100%" }}>
                <Pressable
                    onPress={update}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6b8e7a' }}>
                </Pressable>
                <Pressable
                    onPress={update}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6b8e7a' }}>
                </Pressable>
            </View>
            <Pressable
                onPress={update}
                style={{ width: 343, height: 48, backgroundColor: '#6b8e7a', justifyContent: 'center', alignItems: 'center', borderRadius: 24 }}>
                <Image
                    source={require('../assets/images/Scan.png')}>
                </Image>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                    Scan...
                </Text>
            </Pressable>
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
