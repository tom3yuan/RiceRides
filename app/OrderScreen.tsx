import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, Image, useWindowDimensions, FlatList} from "react-native";
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

const { width , height } = useWindowDimensions();

// Testing Cases -> change to firebase later
// Note that orderNumber must be UNIQUE !!
const [orders, setOrders] = useState([
    {orderNumber: '#1', status: 'completed', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 1:01 AM', price: '$3.00'},
    {orderNumber: '#2', status: 'completed', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 9:02 PM', price: '$8.00'},
    {orderNumber: '#3', status: 'completed', bikeType: 'bike', isPublic: ' /public', time: 'May 17, 5:00 AM', price: '$11.00'},
    {orderNumber: '#4', status: 'completed', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 3:59 AM', price: '$2.00'},
    {orderNumber: '#5', status: 'completed', bikeType: 'bike', isPublic: ' /public', time: 'May 17, 7:27 AM', price: '$7.00'},
    {orderNumber: '#6', status: 'completed', bikeType: 'bike', isPublic: ' /public', time: 'May 17, 3:33 PM', price: '$5.00'},
    {orderNumber: '#7', status: 'completed', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 2:00 PM', price: '$9.00'},
    {orderNumber: '#8', status: 'completed', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 11:32 AM', price: '$8.00'},
    {orderNumber: '#9', status: 'unpaid', bikeType: 'bike', isPublic: ' /private', time: 'May 17, 11:45 AM', price: '$9.00'},
    {orderNumber: '#10', status: 'ongoing', bikeType: 'bike', isPublic:' /public', time: 'May 17, 11:22 AM', price: '$5.00'}
])

    return (
        <View style={{height: 0.8392 * height, width: 0.87277 * width, marginTop: 0.06338 * height, marginLeft: 0.0636 * width}}>
            <Text style={{marginTop: '4.9%', ...styles.screenTitleText}}>
                Orders
            </Text>

            {/* section for ongoing or unpaid orders*/}
            {/* only contain one order*/}
            {/* need to be adjusted based on the status*/}
            <View style={{marginTop: '5.5%', width: '100%', height: '13.15%'}}>

                {/*if no unpaid or in progress orders, this text will not be shown*/}
                <Text style={styles.statusTitleText}>
                    STATUS {/*UNPAID or IN PROGRESS*/}
                </Text>

                <Pressable style={{...styles.unpaidOngoingText,...styles.ordersButtonText, height: 0.07042254 * height, marginTop: 5}}>
                    {/*sample image*/}
                    {/*need to standardize the shape of the input images*/}
                    <Image
                        source={require('../assets/images/ongoing.png')}
                    />

                    {/*sample type and public*/}
                    {/*adjust the layout if the font is too small*/}
                    {/*need to add the price object*/}
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={styles.bikeTypeText}>Bike Type</Text>
                            <Text style={styles.isPublicText}> /Public</Text>
                        </View> 
                        <Text style={styles.priceDateInfoText}>May 17, 11:00 AM(date)</Text>
                        <Text style={styles.priceDateInfoText}>$5.00(price)</Text>
                    </View>
                </Pressable>
            </View>
            

            <View style={{marginTop: '5.5%', width: '100%'}}>
                <Text style={[styles.statusTitleText, styles.titleBottomLine]}>
                    PAST
                </Text>
            </View>
            <FlatList 
            data={orders}
            keyExtractor={(item) => item.orderNumber} //avoid bug when re-ordering happens
            renderItem={({ item }) => (
                <Pressable style={[styles.completedText, styles.titleBottomLine]}>
                    <Pressable style={{...styles.ordersButtonText,height: 0.07042254 * height}}>
                    {/*sample image*/}
                    {/*need to standardize the shape of the input images*/}
                    <Image
                        source={require('../assets/images/ongoing.png')}
                    />

                    {/*sample type and public*/}
                    {/*adjust the layout if the font is too small*/}
                    {/*need to add the price object*/}
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                            <Text style={styles.bikeTypeText}>{item.bikeType}</Text>
                            <Text style={styles.isPublicText}>{item.isPublic}</Text>
                        </View> 
                        <Text style={styles.priceDateInfoText}>{item.time}</Text>
                        <Text style={styles.priceDateInfoText}>{item.price}</Text>
                    </View>
                    </Pressable>
                </Pressable>
            )}/>
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
    screenTitleText: {
        color: '#000000', 
        fontWeight: 800, 
        fontFamily: 'Inter',
        fontSize: 32
    },
    statusTitleText:{
        color: '#000000', 
        fontWeight: 800, 
        fontFamily: 'Inter',
        fontSize: 20
    },
    bikeTypeText:{
        color: '#000000', 
        fontWeight: 700, 
        fontFamily: 'Inter',
        fontSize: 14,
    },
    unpaidOngoingText:{
        borderWidth: 1,
        borderColor: '#6B8E7A',
        borderRadius: 8,
    },
    completedText:{
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6E1',
        paddingBottom: 5,
        marginBottom: 10,
    },
    ordersButtonText:{
        padding: '2%',
        flexDirection: 'row',
        columnGap: 20
    },
    isPublicText:{
        color: '#000000', 
        fontWeight: 400, 
        fontFamily: 'Inter',
        fontSize: 10,
    },
    priceDateInfoText:{
        color: '#757575', 
        fontWeight: 400, 
        fontFamily: 'Inter',
        fontSize: 10,
    },
    titleBottomLine:{
        borderBottomWidth: 1,
        borderBottomColor: '#757575',
        paddingBottom: 5,
        marginBottom: 10,
    }
})
export default HomeScreen;
