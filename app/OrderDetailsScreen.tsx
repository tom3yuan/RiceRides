import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';




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
    const [docs, setDocs] = useState([]);

    useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Rides'), (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });
        setDocs(results);
        console.log('Realtime update:', results);
    }, (error) => {
        console.error('Error listening to realtime updates:', error);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
}, []);
    return (
        <View>
      {docs.length > 0 ? (
        docs.map(doc => (
          <Text key={doc.id}>{JSON.stringify(doc)}</Text>
        ))
      ) : (
        <Text>Loading or no documents</Text>
      )}
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
