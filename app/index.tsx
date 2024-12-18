/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import IntroImage from "../assets/images/IntroImage.png";
import { router, useNavigation } from "expo-router";
import * as Network from "expo-network";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AlertModal from "~/Components/AlertModal.android";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Authentication/Layout";

SplashScreen.preventAutoHideAsync();
const GettingStarted = () => {
    const [isConnected, setIsConnected] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [netModal, setNetModal] = useState(false);
    const [value, setValue] = useState("");

    const [fontsLoaded, error] = useFonts({
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    });

    const handleFirst = async () => {
        try {
            const value = await AsyncStorage.getItem("first");
            console.log(value);
            // if(value === 'true'){
            //     router.replace("/Authentication/Layout");
            // }
            setValue(value);
        } catch (err) {
            alert(err);
        }
    };
    const setFirst = async () => {
        await AsyncStorage.setItem("first", "true");
    };

    const checkInternetConnection = async () => {
        setRefreshing(true);
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected);
        if (networkState) {
            setRefreshing(false);
        }
        if (!networkState.isConnected) {
            setNetModal(true);
        } else {
            setNetModal(false);
        }
    };

    useEffect(() => {
        checkInternetConnection();
        handleFirst();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        checkInternetConnection();
    };

    const handleNotConnected = () => {
        setNetModal(false);
    };
    useEffect(() => {
        if (fontsLoaded || error) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#291D89" />
            {value === "false" ? (
                <View className="flex-1 h-screen bg-[#291D89]">
                    <ScrollView
                        className="flex h-[80%] bg-[#291D89]"
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View className="flex items-center justify-end h-[90vh]">
                            <View className="absolute bg-[#7687df] h-40 w-40 rounded-full blur-3xl -left-10 -top-10 backdrop-blur-3xl"></View>
                            <View className="absolute bg-[#7687df] h-20 w-20 rounded-full blur-3xl right-[-15] -bottom-20 backdrop-blur-3xl"></View>
                            <Image
                                source={IntroImage}
                                style={{
                                    width: 200,
                                    height: 200,
                                    marginBottom: 40,
                                }}
                                resizeMode="contain"
                            />
                            <View className="mx-6 flex items-center">
                                <View className="h-40 mb-[35%]">
                                    <Text
                                        className={`text-4xl text-[#F0F4FF] text-center`}
                                        style={{ fontFamily: "Nunito-Bold" }}
                                    >
                                        Effortless Management of Your Security
                                        Workforce
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    className="bg-[#F0F4FF] rounded-[12] px-5 py-3 mb-20 flex items-center justify-center flex-row shadow-lg"
                                    onPress={() => {
                                        router.navigate(
                                            "/Authentication/Layout"
                                        );
                                        setFirst();
                                    }}
                                    disabled={!isConnected}
                                >
                                    <Text
                                        className={`${isConnected ? "text-[#291D89]" : "text-[#c0b8fd]"} text-xl font-[Nunito-SemiBold] uppercase w-48`}
                                    >
                                        Getting Started
                                    </Text>
                                    <Ionicons
                                        name="caret-back"
                                        size={20}
                                        color={
                                            isConnected ? "#291D89" : "#c0b8fd"
                                        }
                                        className="rotate-180"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {netModal && (
                            <AlertModal
                                isVisible={netModal}
                                header="Alert"
                                content="You are not connected to internet."
                                handleModal={handleNotConnected}
                                button="Okay"
                            />
                        )}
                    </ScrollView>
                </View>
            ) : (
                <Layout />
            )}
        </>
    );
};

export default GettingStarted;
