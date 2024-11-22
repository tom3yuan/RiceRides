import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View className="flex-1 bg-gray-200">

            <View className="absolute top-16 left-10 m-4 justify-center">
                <Text className="text-4xl text-lg font-bold">Welcome Back!</Text>
            </View>
            <View className="flex-1 justify-center items-center">
                {/*map here*/}
            </View>
        </View>

    );
};

export default HomeScreen;
