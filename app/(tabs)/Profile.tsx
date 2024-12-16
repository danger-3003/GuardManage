/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, ScrollView, RefreshControl,Image, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";

const Profile = () => {
    const[userName, setUserName] = useState("");
    const [userDetails,setUserDetails]=useState({name:"userName",age:"50",dob:"01/01/2025",mobileNo:"1234567890",email:"user1@gmail.com"});
    const [editProfile, setEditProfile] = useState(false);
    const [showUser, setShowUser] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(()=>{
        getUserName();
    },[]);

    const getUserName=async()=>{
        const name=await AsyncStorage.getItem("userName");
        setUserName(name);
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.setItem("isLogin", "false");
            await AsyncStorage.setItem("first", "false");
            await AsyncStorage.setItem("userName", "");
            router.replace("/Authentication/Layout");
        } catch (err) {
            alert(err);
        }
    };

    const handleEditProfile=()=>{
        setEditProfile(!editProfile);
    }

    return (
        <ScrollView>
            <View className="w-full">
                <View className="bg-[#291d89] h-36 px-5 w-screen flex items-center justify-center flex-col  relative">
                    <View className="w-full flex items-end mr-0">
                        <TouchableOpacity onPress={handleLogout} className="absolute top-10">
                            <MaterialCommunityIcons name="logout" size={30} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                    <View className="">
                        <Image source={require("../../assets/images/noProfile.png")} className="h-40 w-40 rounded-full relative -bottom-14 border-[#291d89]" style={{borderWidth:7}}/>
                    </View>
                </View>
                {/* Edit Profile Button */}
                <View className="flex items-end justify-center">
                    <TouchableOpacity onPress={handleEditProfile}>
                        {
                            editProfile?
                            <MaterialCommunityIcons name="account-check-outline" size={30} color="#16a34a" className="mt-5 mr-[1.3rem]" />
                            :
                            <MaterialCommunityIcons name="account-edit-outline" size={30} color="#ef4444" className="mt-5 mr-5" /> 
                        }
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-center w-full mt-5 px-5">
                    <View>
                        <Text className="font-[Nunito-Bold] text-3xl text-[#291d89]">{userName}</Text>
                    </View>
                    <View className="w-full mt-5">
                        {/* User Details Section */}
                        <View>
                            <Pressable onPress={()=>{setShowUser(!showUser)}}>
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">User Details</Text>
                                    <FontAwesome name="chevron-down" size={15} color="#291d89" className={`mx-3 ${showUser?"-rotate-180":"rotate-0"} transition-all duration-500`}/>
                                </View>
                            </Pressable>
                            {
                                showUser && 
                                <View className="">
                                    <View className="-mt-2 flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                        <Text className="text-xl font-[Nunito-SemiBold]">Name</Text>
                                        {/* <Text >{userName}</Text> */}
                                        <TextInput value={userName} className={`text-xl font-[Nunito-Regular] ${editProfile?"bg-slate-200 w-44 text-red-600":"text-[#6c6c6c]"} py-[-1rem]`} readOnly={!editProfile}/>
                                    </View>
                                    <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                        <Text className="text-xl font-[Nunito-SemiBold]">Age</Text>
                                        <TextInput value={userDetails.age} className={`text-xl font-[Nunito-Regular] ${editProfile?"bg-slate-200 w-44 text-red-600":"text-[#6c6c6c]"} py-[-1rem]`} readOnly={!editProfile}/>
                                        {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.age}</Text> */}
                                    </View>
                                    <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                        <Text className="text-xl font-[Nunito-SemiBold]">Date of Birth</Text>
                                        <TextInput value={userDetails.dob} className={`text-xl font-[Nunito-Regular] ${editProfile?"bg-slate-200 w-44 text-red-600":"text-[#6c6c6c]"} py-[-1rem]`} readOnly={!editProfile}/>
                                        {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.dob}</Text> */}
                                    </View>
                                    <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                        <Text className="text-xl font-[Nunito-SemiBold]">Mobile Number</Text>
                                        <TextInput value={userDetails.mobileNo} className={`text-xl font-[Nunito-Regular] ${editProfile?"bg-slate-200 w-44 text-red-600":"text-[#6c6c6c]"} py-[-1rem]`} readOnly={!editProfile}/>
                                        {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.mobileNo}</Text> */}
                                    </View>
                                    <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14 -mb-2">
                                        <Text className="text-xl font-[Nunito-SemiBold]">Email</Text>
                                        <TextInput value={userDetails.email} className={`text-xl font-[Nunito-Regular] ${editProfile?"bg-slate-200 w-44 text-red-600":"text-[#6c6c6c]"} py-[-1rem]`} readOnly={!editProfile}/>
                                        {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.email}</Text> */}
                                    </View>
                                </View>
                            }
                            <View className={`${showUser?"border-none":"border-b-2"} border-[#4E67EB] mt-4`}></View>
                        </View>
                        {/* Change Password Section */}
                        <View>
                            <Pressable onPress={()=>{setShowPassword(!showPassword)}}>
                                <View className="flex flex-row items-center justify-between mt-5">
                                    <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">Change Password</Text>
                                    <FontAwesome name="chevron-down" size={15} color="#291d89" className={`mx-3 ${showPassword?"-rotate-180":"rotate-0"} transition-all duration-500`}/>
                                </View>
                            </Pressable>
                        </View>
                        {/* <View className="flex flex-row items-center justify-start mt-5">
                            <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">User Details</Text>
                            <FontAwesome name="chevron-down" size={15} color="#291d89" className="mx-3"/>
                        </View> */}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
