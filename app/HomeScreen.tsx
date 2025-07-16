import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, Image, useWindowDimensions, } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';


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
        console.log(selected)
    }

    const [selected, setSelected] = useState('Public');

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, width: '100%', height: '7%', backgroundColor: '#6B8E7A', borderColor: "#FFFFFF", /*borderBottomWidth: 1*/ }}>
            </View>

            <View style={{ position: 'absolute', top: '7%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '7%' }}>
                <Pressable
                    //change function below
                    onPress={() => setSelected('Public')}
                    style={{ flex: 1, backgroundColor: '#6B8E7A', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    {selected === 'Public' && <View style={{ borderRadius: 25, backgroundColor: '#000000', paddingVertical: 5, paddingHorizontal: 10, zIndex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text
                            style={{ fontSize: 20, color: '#FFFFFF', fontWeight: '800', zIndex: 2 }}>
                            Public
                        </Text>
                    </View>}
                    {selected === 'Personal' && <Text
                        style={{ fontSize: 20, color: '#FFFFFF', fontWeight: '800', zIndex: 2 }}>
                        Public
                    </Text>}

                </Pressable>
                <View style={{ width: 1, backgroundColor: '#FFFFFF' }}></View>
                <Pressable
                    //change function below
                    onPress={() => setSelected('Personal')}
                    style={{ flex: 1, backgroundColor: '#6B8E7A', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {selected === 'Personal' && <View style={{ borderRadius: 25, backgroundColor: '#000000', paddingVertical: 5, paddingHorizontal: 10, zIndex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text
                            style={{ fontSize: 20, color: '#FFFFFF', fontWeight: '800', zIndex: 2 }}>
                            Personal
                        </Text>
                    </View>}
                    {selected === 'Public' && <Text
                        style={{ fontSize: 20, color: '#FFFFFF', fontWeight: '800', zIndex: 2 }}>
                        Personal
                    </Text>}
                </Pressable>
            </View>
            <View style = {{height: '10%'}}/>
            <Pressable
                onPress={update}
                style={{ flexDirection: 'row', width: '87%', height: 0.056338 * height, backgroundColor: 'rgba(107, 142, 122, 0.5)', alignItems: 'center', borderRadius: 24, marginBottom: '7%' }}>
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
                style={{ flexDirection: 'row', width: '87%', height: 0.056338 * height, backgroundColor: '#6B8E7A', alignItems: 'center', borderRadius: 10, marginBottom: '7%' }}>
                <Image
                    source={require('../assets/images/ongoing.png')}
                    style={{ marginRight: '3%', marginLeft: '5%', width: 0.061 * width, height: 0.0282 * height, }}
                />
                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600', flex: 1 }}>
                    Ongoing Order...
                </Text>
                <Image
                    source={require('../assets/images/arrow.png')}
                    style={{ marginRight: '13%', width: 0.025 * width, height: 0.021 * height }}
                />
            </Pressable>
            <View style={{ backgroundColor: '#757575', width: '87%', height: 1, marginBottom: '7%' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '87%', height: '20%' }}>
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginRight: '5%', borderRadius: 8, overflow: 'hidden' }}>
                    <View
                        style={{ backgroundColor: 'rgba(107, 142, 122, 0.3)', height: '40%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/gift.png')}
                            style={{ width: 0.07 * width, height: 0.031 * height }}
                        />

                    </View>
                    <View
                        style={{ backgroundColor: '#E5E6E1', height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{ textAlign: 'center' }}>
                            Cards{'\n'}
                            &{'\n'}
                            Coupons
                        </Text>
                    </View>
                </View>
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginLeft: '5%', borderRadius: 8, overflow: 'hidden' }}>
                    <View
                        style={{ backgroundColor: 'rgba(107, 142, 122, 0.3)', height: '40%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/heart.png')}
                            style={{ width: 0.077 * width, height: 0.03 * height }}
                        />
                    </View>
                    <View
                        style={{ backgroundColor: '#E5E6E1', height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{ textAlign: 'center' }}>
                            Feedback{'\n'}
                            &{'\n'}
                            Donations
                        </Text>
                    </View>
                </View>
            </View>

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
