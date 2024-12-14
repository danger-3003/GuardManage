/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, ScrollView, RefreshControl,Image, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";

const Profile = () => {
    const[userName, setUserName] = useState("");
    const [userDetials,setUserDetails]=useState({name:"userName",age:"50",dob:"01/01/2025",mobileNo:1234567890,email:"user1@gmail.com"});

    const getUserName=async()=>{
        const name=await AsyncStorage.getItem("userName");
        setUserName(name);
    }

    useEffect(()=>{
        getUserName();
    },[]);

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

    const handleEditProfile=()=>{
        console.log("Edit Profile");
    }

    return (
        <ScrollView>
            <View className="w-full">
                <View className="bg-[#291d89] h-36 px-5 w-screen flex items-center justify-center flex-col  relative">
                    <View className="w-full flex items-end mr-5">
                        <TouchableOpacity onPress={handleLogout} className="absolute top-10">
                            <MaterialCommunityIcons name="logout" size={24} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="">
                        <Image source={require("../../assets/images/noProfile.png")} className="h-40 w-40 rounded-full relative -bottom-14 border-[#291d89]" style={{borderWidth:7}}/>
                    </View>
                </View>
                <TouchableOpacity className="flex items-end w-screen justify-center" onPress={handleEditProfile}>
                    <MaterialCommunityIcons name="account-edit-outline" size={30} color="#ef4444" className="mt-5 mr-5" /> 
                </TouchableOpacity>
                <View className="flex items-center justify-center w-full mt-5 px-5">
                    <View>
                        <Text className="font-extrabold text-3xl text-[#291d89]">{userName}</Text>
                    </View>
                    <View className="w-full mt-5">
                        <View className="flex flex-row items-center justify-start">
                            <Text className="font-bold text-2xl text-[#291d89]">User Details</Text>
                            <FontAwesome name="chevron-down" size={15} color="#291d89" className="mx-3"/>
                        </View>
                        <View>
                            <View className="-mt-2 flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                <Text className="text-xl font-semibold">Name</Text>
                                {/* <Text >{userName}</Text> */}
                                <TextInput value={userName} className="text-xl font-normal text-[#6c6c6c]" readOnly={true}/>
                            </View>
                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                <Text className="text-xl font-semibold">Age</Text>
                                <Text className="text-xl font-normal text-[#6c6c6c]">{userDetials.age}</Text>
                            </View>
                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                <Text className="text-xl font-semibold">Date of Birth</Text>
                                <Text className="text-xl font-normal text-[#6c6c6c]">{userDetials.dob}</Text>
                            </View>
                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                <Text className="text-xl font-semibold">Mobile Number</Text>
                                <Text className="text-xl font-normal text-[#6c6c6c]">{userDetials.mobileNo}</Text>
                            </View>
                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                <Text className="text-xl font-semibold">Email</Text>
                                <Text className="text-xl font-normal text-[#6c6c6c]">{userDetials.email}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center justify-start mt-5">
                            <Text className="font-bold text-2xl text-[#291d89]">User Details</Text>
                            <FontAwesome name="chevron-down" size={15} color="#291d89" className="mx-3"/>
                        </View>
                        <View className="flex flex-row items-center justify-start mt-5">
                            <Text className="font-bold text-2xl text-[#291d89]">User Details</Text>
                            <FontAwesome name="chevron-down" size={15} color="#291d89" className="mx-3"/>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
