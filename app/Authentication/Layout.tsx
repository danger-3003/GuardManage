/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { View, Text, Pressable, TouchableOpacity, BackHandler } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Layout = () => {
    useEffect(()=>{
        const backAction=()=>{
            return true;
        }

        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
        return()=>backHandler.remove();
    },[]);

    const getLogin=async()=>{
        try{
            const loginStatus=await AsyncStorage.getItem('isLogin');
            if(loginStatus === "true"){
                router.replace("/(tabs)")
            }
            else{
                router.replace("/Authentication/Login")
            }
        }
        catch(err){alert(err)}
    }

    return (
        <LinearGradient
            colors={['#291D89','#7184E4']}
            className="flex-1"
            start={{x:0,y:0}}
            end={{x:1,y:1}}
        >
            <View className="mx-5 mt-6">
                {/* <View className="relative" style={{zIndex:10}}>
                    <Pressable onPress={() => {router.back()}} className="">
                        <Ionicons name="arrow-back-outline" size={25} color="#F0F4FF" />
                    </Pressable>
                </View> */}
                <View className="flex items-center justify-center h-[90vh] relative">
                    <View className="absolute bg-[#7687df] h-40 w-40 rounded-full blur-3xl backdrop-blur-3xl" style={{left:-70,top:-100,zIndex:0}}></View>
                    <View className="absolute bg-[#7687df] h-20 w-20 rounded-full blur-3xl backdrop-blur-3xl" style={{right:-40,bottom:100,zIndex:0}}></View>
                    <View className="flex items-center justify-center h-40 mb-32">
                        <View className="mb-7">
                            <Text className={`font-[Nunito-Bold] text-[2.5rem] text-[#F0F4FF] text-center`}>Streamline Guard Processes</Text>
                        </View>
                        <View>
                            <Text className="font-[Nunito-Regular] text-2xl text-[#F0F4FF] text-center tracking-wide">All in one centralized platform.</Text>
                        </View>
                    </View>
                    <View className="mt-20">
                        <TouchableOpacity className="bg-[#F0F4FF] rounded-xl my-2 w-[150] py-3 px-5 flex flex-row items-center justify-between shadow-lg" onPress={()=>{router.navigate("/Authentication/Register")}}>
                            <Text className="text-[#291D89] font-[Nunito-Bold] text-xl text-center">Register</Text>
                            <Ionicons name="caret-back" size={15} color="#291D89" className="rotate-180"/>
                        </TouchableOpacity> 
                        <TouchableOpacity className="border-2 border-[#F0F4FF] bg-[#586ac5] rounded-xl my-2 w-[150] py-3 px-5 flex flex-row items-center justify-between shadow-lg" onPress={getLogin}>
                            <Text className="text-[#F0F4FF] font-[Nunito-Bold] text-xl text-center">Login</Text>
                            <Ionicons name="caret-back" size={15} color="#F0F4FF" className="rotate-180"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Layout;
