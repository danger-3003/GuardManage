/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Image,
    TextInput,
    Pressable,
    Modal,
    Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import AlertModal from "../Components/AlertModal";
import { useEffect, useState, useRef, useCallback } from "react";
import { TouchableRipple } from "react-native-paper";

const Profile = () => {
    const [userName, setUserName] = useState("");
    const [userDetails, setUserDetails] = useState({
        name: "userName",
        age: "50",
        dob: "01/01/2025",
        mobileNo: "1234567890",
        email: "user1@gmail.com",
    });
    const [userImage, setUserImage] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [showUser, setShowUser] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showShift, setShowShift] = useState(true);
    const [noImage, setNoImage] = useState(false);
    const date = new Date();
    const shiftDetails = "A"; //location and GPS Section
    const shiftAddress =
        "Botcha Square, Birla Junction, Visakhapatnam, Andhra Pradesh 530040";

    useEffect(() => {
        getUserName();
    }, []);

    const getUserName = async () => {
        const name = await AsyncStorage.getItem("userName");
        setUserName(name);
    };

    const handleTakeImage = async () => {
        const Image = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            // base64: true,
        });
       (Image.canceled)?setNoImage(true):setUserImage(Image.assets[0].uri);
    };

    const handleSelectImage = async () => {
        const Image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            // base64:true
        });
        (Image.canceled)?setNoImage(true):setUserImage(Image.assets[0].uri);
    };
    const handleNoImage=()=>{
        setNoImage(false);
        console.log("No Image to false");
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = () => {
        bottomSheetModalRef.current.present();
    };

    const handleCollapseModalPress = () => {
        bottomSheetModalRef.current.dismiss();
    };

    const renderBackDrop = useCallback((props: any) => {
        return (
            <BottomSheetBackdrop
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            />
        );
    }, []);

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

    const handleEditProfile = () => {
        setEditProfile(!editProfile);
        setShowUser(true);
    };

    return (
        <>
            <GestureHandlerRootView className="">
                <ScrollView className="pb-20 bg-background w-full">
                    <View className="w-full relative top-0">
                        <View className="flex-1 items-center justify-center">
                            <Modal animationType="fade" transparent={true} visible={noImage}>
                                <View className="flex-1 items-center justify-center bg-[#0000008a]" style={{backgroundColor:"#0000008a"}}>
                                    <View className="bg-[#d2e1ff] rounded-[2rem] flex items-start justify-center flex-col p-7 w-[85%]">
                                        <Text className="text-left text-primary text-3xl font-[Roboto-Regular]">No Image</Text>
                                        <Text className=" text-primary my-3 font-[Roboto-Regular]">Please select an Image.</Text>
                                        <View className='flex w-full items-end justify-center'>
                                            <View className='relative rounded-full overflow-hidden'>
                                                <TouchableRipple onPress={handleNoImage} className="py-3 w-20 flex items-center justify-center" rippleColor="#4e67eb2a">
                                                    <View className="flex items-center justify-center flex-row">
                                                        <Text className="text-left text-xl text-primary font-[Roboto-Regular]">OK</Text>
                                                    </View>
                                                </TouchableRipple>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View className="bg-[#291d89] h-36 px-5 w-screen flex items-center justify-center flex-col  relative">
                            <View className="w-full flex items-end mr-0">
                                <TouchableOpacity
                                    onPress={handleLogout}
                                    className="absolute top-10"
                                >
                                    <MaterialCommunityIcons
                                        name="logout"
                                        size={30}
                                        color="#ef4444"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View className="relative">
                                <Image
                                    source={
                                        userImage
                                            ? { uri: userImage }
                                            : require("../../assets/images/noProfile.png")
                                    }
                                    className="h-40 w-40 rounded-full relative -bottom-14 border-[#291d89]"
                                    style={{ borderWidth: 7 }}
                                />
                                <TouchableOpacity
                                    className="absolute -bottom-10 right-0"
                                    onPress={handlePresentModalPress}
                                >
                                    <View className="bg-background rounded-full">
                                        <Entypo
                                            name="circle-with-plus"
                                            size={30}
                                            color="#4E67EB"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Edit Profile Button */}
                        <View className="flex items-end justify-center">
                            <TouchableOpacity onPress={handleEditProfile}>
                                {editProfile ? (
                                    <MaterialCommunityIcons
                                        name="account-check-outline"
                                        size={30}
                                        color="#16a34a"
                                        className="mt-5 mr-[1.3rem]"
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name="account-edit-outline"
                                        size={30}
                                        color="#ef4444"
                                        className="mt-5 mr-5"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View className="flex items-center justify-center w-full mt-5 px-5 mb-24">
                            <View>
                                <Text className="font-[Nunito-Bold] text-3xl text-[#291d89]">
                                    {userName}
                                </Text>
                            </View>
                            <View className="w-full mt-5">
                                {/* User Details Section */}
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            setShowUser(!showUser);
                                        }}
                                    >
                                        <View className="flex flex-row items-center justify-between">
                                            <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">
                                                User Details
                                            </Text>
                                            <FontAwesome
                                                name="chevron-down"
                                                size={15}
                                                color="#291d89"
                                                className={`mx-3 ${showUser ? "-rotate-180" : "rotate-0"} transition-all duration-500`}
                                            />
                                        </View>
                                    </Pressable>
                                    {showUser && (
                                        <View className="">
                                            <View className="-mt-2 flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                                <Text className="text-xl font-[Nunito-SemiBold]">
                                                    Name
                                                </Text>
                                                {/* <Text >{userName}</Text> */}
                                                <TextInput
                                                    value={userName}
                                                    className={`text-xl font-[Nunito-Regular] ${editProfile ? "bg-slate-200 w-44 text-red" : "text-[#6c6c6c]"} py-[-1rem]`}
                                                    readOnly={!editProfile}
                                                />
                                            </View>
                                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                                <Text className="text-xl font-[Nunito-SemiBold]">
                                                    Age
                                                </Text>
                                                <TextInput
                                                    value={userDetails.age}
                                                    className={`text-xl font-[Nunito-Regular] ${editProfile ? "bg-slate-200 w-44 text-red" : "text-[#6c6c6c]"} py-[-1rem]`}
                                                    readOnly={!editProfile}
                                                />
                                                {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.age}</Text> */}
                                            </View>
                                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                                <Text className="text-xl font-[Nunito-SemiBold]">
                                                    Date of Birth
                                                </Text>
                                                <TextInput
                                                    value={userDetails.dob}
                                                    className={`text-xl font-[Nunito-Regular] ${editProfile ? "bg-slate-200 w-44 text-red" : "text-[#6c6c6c]"} py-[-1rem]`}
                                                    readOnly={!editProfile}
                                                />
                                                {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.dob}</Text> */}
                                            </View>
                                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14">
                                                <Text className="text-xl font-[Nunito-SemiBold]">
                                                    Mobile Number
                                                </Text>
                                                <TextInput
                                                    value={userDetails.mobileNo}
                                                    className={`text-xl font-[Nunito-Regular] ${editProfile ? "bg-slate-200 w-44 text-red" : "text-[#6c6c6c]"} py-[-1rem]`}
                                                    readOnly={!editProfile}
                                                />
                                                {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.mobileNo}</Text> */}
                                            </View>
                                            <View className="flex flex-row items-end pb-1 justify-between border-b-2 border-[#4E67EB] h-14 -mb-2">
                                                <Text className="text-xl font-[Nunito-SemiBold]">
                                                    Email
                                                </Text>
                                                <TextInput
                                                    value={userDetails.email}
                                                    className={`text-xl font-[Nunito-Regular] ${editProfile ? "bg-slate-200 w-44 text-red" : "text-[#6c6c6c]"} py-[-1rem]`}
                                                    readOnly={!editProfile}
                                                />
                                                {/* <Text className="text-xl font-[Nunito-Regular] text-[#6c6c6c]">{userDetails.email}</Text> */}
                                            </View>
                                        </View>
                                    )}
                                    <View
                                        className={`${showUser ? "border-none" : "border-b-2"} border-[#4E67EB] mt-4`}
                                    ></View>
                                </View>
                                {/* Change Password Section */}
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    >
                                        <View className="flex flex-row items-center justify-between mt-5">
                                            <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">
                                                Change Password
                                            </Text>
                                            <FontAwesome
                                                name="chevron-down"
                                                size={15}
                                                color="#291d89"
                                                className={`mx-3 ${showPassword ? "-rotate-180" : "rotate-0"} transition-all duration-500`}
                                            />
                                        </View>
                                    </Pressable>
                                    <View
                                        className={`border-b-2 border-[#4E67EB] mt-4`}
                                    ></View>
                                </View>
                                {/* Shift Section */}
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            setShowShift(!showShift);
                                        }}
                                    >
                                        <View className="flex flex-row items-center justify-between mt-5">
                                            <Text className="font-[Nunito-Bold] text-2xl text-[#291d89]">
                                                Shift Details
                                            </Text>
                                            <FontAwesome
                                                name="chevron-down"
                                                size={15}
                                                color="#291d89"
                                                className={`mx-3 ${showShift ? "-rotate-180" : "rotate-0"} transition-all duration-500`}
                                            />
                                        </View>
                                    </Pressable>
                                    {showShift && (
                                        <View className="">
                                            <View className="w-full mb-5">
                                                <View className="w-full flex items-center flex-row my-4">
                                                    <View className="bg-[#4e67eb] w-20 h-20 mx-5 flex items-center justify-center rounded-xl shadow-lg shadow-slate-900">
                                                        <Entypo
                                                            name="clock"
                                                            size={40}
                                                            color="#f0f4ff"
                                                        />
                                                    </View>
                                                    <View className="basis-[80%]">
                                                        <Text className="font-[Nunito-Bold] text-xl mb-1">
                                                            Current Shift
                                                        </Text>
                                                        <Text className="font-[Nunito-Regular] text-xl mb-1">
                                                            {date.toLocaleDateString()}
                                                            , {shiftDetails}, 6
                                                            Hours
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text className="font-[Nunito-Bold] text-2xl text-primary">
                                                    Assigned Location
                                                </Text>
                                                <View className="w-full flex items-center flex-row mt-4">
                                                    <View className="bg-[#4e67eb] w-20 h-20 mx-5 flex items-center justify-center rounded-xl shadow-lg shadow-slate-900">
                                                        <Entypo
                                                            name="location-pin"
                                                            size={40}
                                                            color="#f0f4ff"
                                                        />
                                                    </View>
                                                    <View className="basis-[80%]">
                                                        <Text className="text-xl mr-5 font-[Nunito-Regular]">
                                                            {shiftAddress}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomSheetModalProvider>
                    <BottomSheetModal
                    enablePanDownToClose={true}
                        backdropComponent={renderBackDrop}
                        ref={bottomSheetModalRef}
                        handleIndicatorStyle={{
                            backgroundColor: "#291d89",
                            width: 25,
                        }}
                        backgroundStyle={{
                            backgroundColor: "#f0f4ff",
                            borderRadius: 30,
                        }}
                        // onChange={handleSheetChanges}
                    >
                        <BottomSheetView className="flex-1 h-[17rem]">
                            <View className="flex items-center justify-center w-[100vw] pt-7 flex-row">
                                <View className="flex items-center justify-center w-32">
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCollapseModalPress();
                                            handleSelectImage();
                                        }}
                                        className="bg-secondary h-16 w-16 rounded-full flex items-center justify-center shadow-slate-900 shadow-md"
                                    >
                                        <Ionicons
                                            name="images-outline"
                                            size={30}
                                            color="#f0f4ff"
                                        />
                                    </TouchableOpacity>
                                    <Text className="text-center font-[Nunito-Bold] mt-2 text-primary">
                                        Upload Photo
                                    </Text>
                                </View>
                                <View className="flex items-center justify-center w-32">
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCollapseModalPress();
                                            handleTakeImage();
                                        }}
                                        className="bg-secondary h-16 w-16 rounded-full flex items-center justify-center shadow-slate-900 shadow-md"
                                    >
                                        <Ionicons
                                            name="camera-outline"
                                            size={30}
                                            color="#f0f4ff"
                                        />
                                    </TouchableOpacity>
                                    <Text className="text-center font-[Nunito-Bold] mt-2 text-primary">
                                        Take Photo
                                    </Text>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    );
};

export default Profile;
