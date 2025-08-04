import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet, Pressable, Image, useWindowDimensions, FlatList } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';

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
    const [docs, setDocs] = useState([]);
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

    const [selected, setSelected] = useState('Personal');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Rides'), (querySnapshot) => {
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setDocs(results); // triggers UI update
        }, (error) => {
            console.error('Error with Firestore listener:', error);
        });

        return () => unsubscribe(); // clean up listener on unmount
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, width: '100%', height: '7%', backgroundColor: '#6B8E7A', borderColor: "#FFFFFF", /*borderBottomWidth: 1*/ }}>
            </View>

            <View style={{ position: 'absolute', top: '7%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '7%' }}>
                <Pressable
                    //change function below
                    onPress={() =>
                        navigation.navigate("Main", {
                            screen: "Home",
                            params: {
                                // any params
                            },
                        },
                            console.log("Navigating to Home")
                        )
                    }
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
                    //no function for now
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
            <View style={{ height: '10%' }} />
            <Pressable
                onPress={update}
                style={{ flexDirection: 'row', width: '87%', height: 0.056338 * height, backgroundColor: 'rgba(107, 142, 122, 0.5)', alignItems: 'center', borderRadius: 24, marginBottom: '7%' }}>
                <Image
                    source={require('../assets/images/glass.png')}
                    style={{ marginRight: '3%', marginLeft: '5%', width: 0.061 * width, height: 0.0282 * height, }}
                />
                <Text style={{ color: '#757575', fontSize: 12, }}>
                    Search...
                </Text>
            </Pressable>
            <View style={{ width: '87%', height: 0.22 * height, marginBottom: '7%', justifyContent: 'flex-start', }}>
                {/* may need to change font size */}
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '3%' }}>
                    CLASSIFICATION...
                </Text>
                <View style={{ width: '100%', height: 1, marginBottom: '5%', backgroundColor: '#000000' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '75%' }}>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginRight: '5%', borderRadius: 8, overflow: 'hidden', }}>
                        <View
                            style={{ backgroundColor: 'rgba(107, 142, 122, 0.3)', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/bike.jpg')}
                                style={{ width: 0.07 * width, height: 0.031 * height }}
                            />

                        </View>
                        <View
                            style={{ backgroundColor: '#E5E6E1', height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                BIKES
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginRight: '5%', borderRadius: 8, overflow: 'hidden', }}>
                        <View
                            style={{ backgroundColor: 'rgba(107, 142, 122, 0.3)', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/scooter.jpg')}
                                style={{ width: 0.07 * width, height: 0.031 * height }}
                            />

                        </View>
                        <View
                            style={{ backgroundColor: '#E5E6E1', height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                SCOOTERS
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', borderRadius: 8, overflow: 'hidden', }}>
                        <View
                            style={{ backgroundColor: 'rgba(107, 142, 122, 0.3)', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/electrical_bike.jpg')}
                                style={{ width: 0.07 * width, height: 0.031 * height }}
                            />

                        </View>
                        <View
                            style={{ backgroundColor: '#E5E6E1', height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                OTHERS
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ width: '87%', height: 0.3225 * height, marginBottom: '3%', justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                    GUESS YOU LIKE...
                </Text>
                <View style={{ width: '100%', height: 1, marginBottom: '5%', backgroundColor: '#000000' }} />
                <View style={{ width: '100%', }}>
                    <ScrollView
                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                        {docs.filter((item) => item.Available).map((item) => (
                            <View key={item.id} style={styles.container1}>
                                <Image
                                    source={{
                                        uri: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JiaWtlfGVufDB8fDB8fHww',
                                    }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <View style={styles.card}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.header}>{item.title}</Text>
                                        <Text style={styles.price}>{"$" + item.Rate}</Text>
                                    </View>
                                    <Text style={styles.description} numberOfLines={3}>
                                        {item.Description}
                                    </Text>
                                    <View style={styles.userContainer}>
                                        <Image
                                            source={{ uri: 'https://example.com/user-avatar.jpg' }}
                                            style={styles.avatar}
                                        />
                                        <Text style={styles.username}>{item.owner_name}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
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
        paddingTop: 0,
        backgroundColor: '#FFFFFF',
    },
    map: {
        width: '87%', // Adjust as needed
        height: '28%',
        borderRadius: 10,
        marginBottom: '7%'
    },
    container1: {
        width: '48%',
        marginVertical: 10,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 120, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    card: {
        backgroundColor: '#E5E6E1',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    username: {
        fontSize: 12,
        marginLeft: 5,
    },
})
export default HomeScreen;
