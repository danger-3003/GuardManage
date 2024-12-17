/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
} from "react-native";
import AlertModal from "../../Components/AlertModal.android";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
    const [modal, setModal] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [userDetails, setUserDetails] = useState({
        name: "",
        age: "",
        dob: "",
        mobile: "",
        email: "",
        qualifications: "",
        aadharImage: "",
        panImage: "",
    });
    const handleSubmit = () => {
        if (
            userDetails.name &&
            userDetails.age &&
            userDetails.dob &&
            userDetails.mobile &&
            userDetails
        ) {
            setUserDetails({
                ...userDetails,
                name: "",
                age: "",
                dob: "",
                mobile: "",
                email: "",
                qualifications: "",
                aadharImage: "",
                panImage: "",
            });
            setEmpty(false);
        } else {
            setEmpty(true);
        }
        setModal((prev) => !prev);
    };
    const handleModal = () => {
        setModal(false);
    };

    const [imageModal, setImageModal] = useState(false);
    const [panImage, setPanImage] = useState(null);
    const pickPanImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setPanImage(result.assets[0].uri);
        } else {
            setImageModal((prev) => !prev);
        }
    };
    const [aadharImage, setAadharImage] = useState(null);
    const pickAadharImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setAadharImage(result.assets[0].uri);
        } else {
            setImageModal((prev) => !prev);
        }
    };
    const [profileImage, setProfileImage] = useState(null);
    const pickProfileImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setProfileImage(result.assets[0].uri);
        } else {
            setImageModal((prev) => !prev);
        }
    };

    const [check, setCheck] = useState(false);
    const handleCheckbox = () => {
        setCheck((prev) => !prev);
    };

    const [terms, setTerms] = useState(false);
    const handleTerms = () => {
        console.log("Pressed");
    };

    return (
        <LinearGradient
            colors={["#291D89", "#7184E4"]}
            className="flex-1 px-5"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View
                className="absolute bg-[#7687df] h-40 w-40 rounded-full blur-3xl backdrop-blur-3xl"
                style={{ left: -50, top: 10, zIndex: 1 }}
            ></View>
            <Pressable
                onPress={() => {
                    router.back();
                }}
                className="mt-6 relative"
                style={{ zIndex: 1 }}
            >
                <Ionicons name="arrow-back-outline" size={25} color="#F0F4FF" />
            </Pressable>
            <View className="my-10 flex flex-col items-end justify-center">
                <Text className="text-[#f0f4ff] font-[Nunito-Bold] text-4xl">
                    Join Us
                </Text>
                <Text className="text-[#f0f4ff] font-[Nunito-Regular] text-xl">
                    Create an Account to get started
                </Text>
            </View>
            <ScrollView className="rounded-t-[2rem] bg-[#f0f4ff] shadow-2xl shadow-blue-100 mt-10 px-5 bottom-0 relative">
                <View>
                    <Text className="text-[#291D89] text-center font-[Nunito-Bold] text-3xl py-7">
                        User Details
                    </Text>
                </View>
                <View className="w-full">
                    {/* Name Field */}
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Name
                        </Text>
                        <View className="border border-[#291d89] rounded-xl flex flex-row justify-around items-center h-14 w-[100%]">
                            <TextInput
                                placeholder="Enter your name"
                                numberOfLines={1}
                                value={userDetails.name}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] basis-[90%] ml-2"
                                onChangeText={(text) => {
                                    setUserDetails({
                                        ...userDetails,
                                        name: text,
                                    });
                                }}
                            />
                            <FontAwesome5
                                name="user"
                                size={18}
                                color="#291D89"
                                className="basis-[10%] -ml-5"
                            />
                        </View>
                    </View>
                    {/* Profile Upload */}
                    <View className="flex items-center justify-center">
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2 w-full">
                            Profile Picture
                        </Text>
                        {profileImage ? (
                            <TouchableOpacity onPress={pickProfileImageAsync}>
                                <Image
                                    source={{ uri: profileImage }}
                                    className="h-60 w-60"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                className="bg-[#291d89] rounded-xl flex flex-row justify-center items-center h-14 w-[70%] px-10"
                                onPress={pickProfileImageAsync}
                            >
                                <Text className="text-[#f0f4ff] font-[Nunito-Bold]">
                                    Upload Profile Picture
                                </Text>
                                <Fontisto
                                    name="picture"
                                    size={18}
                                    color="#f0f4ff"
                                    className="ml-5"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Age and DOB Field */}
                    <View className="flex items-center justify-between w-full flex-row">
                        <View className="w-[47%]">
                            <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                                Age
                            </Text>
                            <View className="border border-[#291d89] rounded-xl flex flex-row justify-around h-14 items-center w-[100%]">
                                <TextInput
                                    placeholder="Age"
                                    numberOfLines={1}
                                    maxLength={2}
                                    value={userDetails.age}
                                    keyboardType="number-pad"
                                    className="font-[Nunito-Regular] text-lg text-[#291D89] basis-[80%] ml-2"
                                    onChangeText={(text) => {
                                        setUserDetails({
                                            ...userDetails,
                                            age: text,
                                        });
                                    }}
                                />
                                <Entypo
                                    name="select-arrows"
                                    size={18}
                                    color="#291d89"
                                    className=" -ml-2 basis-[20%]"
                                />
                            </View>
                        </View>
                        <View className="w-[47%]">
                            <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                                Date of Birth
                            </Text>
                            <View className="border border-[#291d89] rounded-xl flex flex-row justify-around items-center h-14 w-[100%]">
                                <TextInput
                                    placeholder="dd/mm/yyyy"
                                    numberOfLines={1}
                                    maxLength={10}
                                    value={userDetails.dob}
                                    className="font-[Nunito-Regular] text-lg text-[#291D89] w-[80%] ml-2"
                                    onChangeText={(text) => {
                                        setUserDetails({
                                            ...userDetails,
                                            dob: text,
                                        });
                                    }}
                                />
                                <Ionicons
                                    name="calendar-outline"
                                    size={18}
                                    color="#291d89"
                                    className="basis-[20%] -ml-2"
                                />
                            </View>
                        </View>
                    </View>
                    {/* Mobile Number Field */}
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Phone Number
                        </Text>
                        <View className="border border-[#291d89] rounded-xl flex flex-row justify-around items-center h-14 w-[100%]">
                            <TextInput
                                placeholder="Enter your phone number"
                                keyboardType="number-pad"
                                numberOfLines={1}
                                maxLength={10}
                                value={userDetails.mobile}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] basis-[90%] ml-2"
                                onChangeText={(text) => {
                                    setUserDetails({
                                        ...userDetails,
                                        mobile: text,
                                    });
                                }}
                            />
                            <Ionicons
                                name="call-outline"
                                size={18}
                                color="#291d89"
                                className="basis-[10%] -ml-5"
                            />
                        </View>
                    </View>
                    {/* Email Field */}
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Email
                        </Text>
                        <View className="border border-[#291d89] rounded-xl flex flex-row justify-around items-center h-14 w-[100%]">
                            <TextInput
                                placeholder="Enter your email address"
                                keyboardType="email-address"
                                numberOfLines={1}
                                value={userDetails.email}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] w-[90%] ml-2"
                                onChangeText={(text) => {
                                    setUserDetails({
                                        ...userDetails,
                                        email: text,
                                    });
                                }}
                            />
                            <Ionicons
                                name="mail-outline"
                                size={18}
                                color="#291d89"
                                className="basis-[10%] -ml-5"
                            />
                        </View>
                    </View>
                    {/* Qualifications Field */}
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Qualifications
                        </Text>
                        <View className="border border-[#291d89] rounded-xl flex flex-row justify-around items-center h-14 w-[100%]">
                            <TextInput
                                placeholder="Enter your Qualifications"
                                numberOfLines={1}
                                value={userDetails.qualifications}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] w-[90%] ml-2"
                                onChangeText={(text) => {
                                    setUserDetails({
                                        ...userDetails,
                                        qualifications: text,
                                    });
                                }}
                            />
                            <Entypo
                                name="graduation-cap"
                                size={18}
                                color="#291d89"
                                className="basis-[10%] -ml-5"
                            />
                        </View>
                    </View>
                    {/* Aadhar Card Upload */}
                    <View className="flex items-center justify-center">
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2 w-full">
                            Aadhar Card Details
                        </Text>
                        {aadharImage ? (
                            <TouchableOpacity onPress={pickAadharImageAsync}>
                                <Image
                                    source={{ uri: aadharImage }}
                                    className="h-40 w-60"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                className="bg-[#291d89] rounded-xl flex flex-row justify-center items-center h-14 w-[70%] px-10"
                                onPress={pickAadharImageAsync}
                            >
                                <Text className="text-[#f0f4ff] font-[Nunito-Bold]">
                                    Pan Card Upload
                                </Text>
                                <Entypo
                                    name="v-card"
                                    size={18}
                                    color="#f0f4ff"
                                    className="ml-5"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Pan Card Upload */}
                    <View className="flex items-center justify-center">
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2 w-full">
                            Pan Card Details
                        </Text>
                        {panImage ? (
                            <TouchableOpacity onPress={pickPanImageAsync}>
                                <Image
                                    source={{ uri: panImage }}
                                    className="h-40 w-60"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                className="bg-[#291d89] rounded-xl flex flex-row justify-center items-center h-14 w-[70%] px-10"
                                onPress={pickPanImageAsync}
                            >
                                <Text className="text-[#f0f4ff] font-[Nunito-Bold]">
                                    Pan Card Upload
                                </Text>
                                <Entypo
                                    name="v-card"
                                    size={18}
                                    color="#f0f4ff"
                                    className="ml-5"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* terms and condition */}
                    <View className="mt-5 flex flex-row w-full items-center justify-start">
                        <TouchableOpacity onPress={handleCheckbox}>
                            <Fontisto
                                name={
                                    check
                                        ? "checkbox-active"
                                        : "checkbox-passive"
                                }
                                size={15}
                                color="#291d89"
                            />
                        </TouchableOpacity>
                        <Text className="ml-2 text-[#291d89]">
                            <Text onPress={handleTerms} className="underline">
                                Terms and conditions
                            </Text>{" "}
                            are applicable.
                        </Text>
                    </View>
                    {/* Apply Now Button */}
                    <TouchableOpacity
                        className={`rounded-xl my-10 py-3 ${check ? "bg-[#4E67EB]" : "bg-[#8b9df3]"} shadow-md shadow-blue-400 `}
                        onPress={handleSubmit}
                        disabled={!check}
                    >
                        <Text className="text-center text-[#f0f4ff] text-xl font-[Nunito-Bold]">
                            Apply Now
                        </Text>
                    </TouchableOpacity>
                </View>
                {empty ? (
                    <AlertModal
                        isVisible={modal}
                        content="Please fill all the fields..."
                        header=""
                        button="Okay"
                        handleModal={handleModal}
                    />
                ) : (
                    <AlertModal
                        isVisible={modal}
                        content="Please wait until Admin accept your request..."
                        header="Alert"
                        button="Done"
                        handleModal={handleModal}
                    />
                )}
                {imageModal && (
                    <AlertModal
                        isVisible={imageModal}
                        content="Please select an Image"
                        header="Alert"
                        button="Done"
                        handleModal={() => {
                            setImageModal(false);
                        }}
                    />
                )}
            </ScrollView>
        </LinearGradient>
    );
};

export default Register;
