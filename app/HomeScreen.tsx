import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View className="flex-1 bg-gray-200 justify-center items-center">
            <Button
                title="Go to Login"
                onPress={() =>
                    navigation.navigate("Login", { name: "Login" })
                }
            />
            <Text className="text-lg font-bold text-blue-500">Hello NativeWind!</Text>
        </View>

    );
};

export default HomeScreen;
