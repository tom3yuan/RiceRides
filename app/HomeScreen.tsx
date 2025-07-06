import React from "react";
import { View, Text, Button, StyleSheet, Pressable, Image, useWindowDimensions } from "react-native";
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

    const { width, height } = useWindowDimensions();
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
            <View style={{ position: 'absolute', top: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '7%' }}>
                <Pressable
                    onPress={update}
                    style={{ flex: 1, backgroundColor: '#6B8E7A', height: '100%' }}>
                </Pressable>
                <View style={{ width: 1, backgroundColor: '#FFFFFF' }}></View>
                <Pressable
                    onPress={update}
                    style={{ flex: 1, backgroundColor: '#6B8E7A', height: '100%' }}>
                </Pressable>
            </View>
            <Pressable
                onPress={update}
                style={{ flexDirection: 'row', width: '87%', height: 0.056338*height, backgroundColor: 'rgba(107, 142, 122, 0.5)', alignItems: 'center', borderRadius: 24, marginBottom: '10%' }}>
                <Image
                    source={require('../assets/images/Scan.png')}
                    style={{ marginRight: '3%', marginLeft: '5%', width: 0.061 * width, height: 0.0282 * height, }}
                />
                <Text style={{ color: '#757575', fontSize: 12, }}>
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
            <Pressable
                onPress={update}
                style={{ flexDirection: 'row', width: '87%', height: 0.056338*height, backgroundColor: '#6B8E7A', alignItems: 'center', borderRadius: 10, marginBottom: '10%' }}>
                <Image
                    source={require('../assets/images/ongoing.png')}
                    style={{ marginRight: '3%', marginLeft: '5%', width: 0.061 * width, height: 0.0282 * height, }}
                />
                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600', flex: 1 }}>
                    Ongoing Order...
                </Text>
                <Image
                    source={require('../assets/images/arrow.png')}
                    style={{ marginRight: '13%', width: 0.025 * width, height: 0.021 * height}}
                />
            </Pressable>
            <View style={{backgroundColor: '#757575', width: '87%', height: 1}}>

            </View>
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
        marginTop: 0,
        paddingTop: 0

    },
    map: {
        width: '87%', // Adjust as needed
        height: '28%',
        borderRadius: 10,
        marginBottom: '7%'
    },
})
export default HomeScreen;
