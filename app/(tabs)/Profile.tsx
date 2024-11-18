/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.setItem("isLogin", "false");
            await AsyncStorage.setItem("userName", "");
            const status = await AsyncStorage.getItem("isLogin");
            router.replace("/Authentication/Layout");
        } catch (err) {
            alert(err);
        }
    };

    return (
        <View>
            <Text>Profile</Text>
            <Text onPress={handleLogout}>Logout</Text>
        </View>
    );
};

export default Profile;
