/* eslint-disable node/handle-callback-err */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    RefreshControl,
    StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import * as Location from "expo-location";
import * as Network from "expo-network";
import AlertModal from "../Components/AlertModal.android.tsx";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";

const index = () => {
    const date = new Date();
    const shiftDetails = "A"; //demo shift - replace with database data
    const daysArray = ["T", "W", "Th", "F", "S", "Su", "M"];
    const weekDays = []; //demo weekdays array - replace with database data
    const datesArray = []; //demo dates array - replace with database data
    let attendanceDate = []; //demo attandence dates array - replace with database data
    //to get past seven days and date
    for (let i = 7; i > 0; i--) {
        const todayDate = new Date(date);
        datesArray.push(todayDate.getDate() + 1 - i);
        weekDays.push(todayDate.getDay() + 1 - i);
        todayDate.setDate(todayDate.getDate() + 1 - i);
        attendanceDate.push(todayDate.toLocaleDateString("en-GB"));
    }
    attendanceDate = attendanceDate.reverse();

    // demo Atendance Records - replace with database records
    const attendanceRecords = [
        { id: "1", location: "Birla Junction", attendance: true, hours: "8" },
        { id: "2", location: "Birla Junction", attendance: true, hours: "6" },
        { id: "3", location: "Birla Junction", attendance: true, hours: "7" },
        { id: "4", location: "Birla Junction", attendance: false, hours: "0" },
        {
            id: "5",
            location: "RTC Complex, Visakhapatnam",
            attendance: true,
            hours: "8",
        },
        { id: "6", location: "Birla Junction", attendance: false, hours: "0" },
        { id: "7", location: "Birla Junction", attendance: true, hours: "6" },
    ];

    //Alert Section
    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(false);
    };

    //location and GPS Section
    const shiftAddress =
        "Botcha Square, Birla Junction, Visakhapatnam, Andhra Pradesh 530040"; //shift address

    const [location, setLocation] = useState(""); //get live location
    const [shiftLocation, setShiftLocation] = useState(); //get current shift location
    const [inLocation, setInLocation] = useState(false); //check whether user is in current location or not
    const [user, setUser] = useState("");
    const [activity, setActivity] = useState(false);
    const [isConnected, setIsConnected] = useState(null);
    const [lModal, setLModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [netModal, setNetModal] = useState(false);
    const [curr, setCurr] = useState(date.getDate());

    const getUserData = async () => {
        const userName = await AsyncStorage.getItem("userName");
        setUser(userName);
    };

    const getShiftLocation = async () => {
        const { foreGround }: any =
            await Location.requestForegroundPermissionsAsync();
        // const { backGround }: any =
        //     await Location.requestBackgroundPermissionsAsync();
        if (foreGround === "granted") {
            alert("Please Grant Permission");
        }
        Location.geocodeAsync(shiftAddress)
            .then((data) => {
                setShiftLocation(data[0]);
                // console.log("work location : ", data);
            })
            .catch((err) => {
                console.log("Try Again");
            });
    };

    useEffect(() => {
        getShiftLocation();
        getUserData();
    }, []);

    let liveLocation: any = "";

    const truncateNumber = (number: number) => {
        return Math.trunc(number * 1000) / 1000;
    };

    const handleLocation = async () => {
        const { foreGround }: any =
            await Location.requestForegroundPermissionsAsync();
        if (foreGround === "granted") {
            alert("Please Grant Permission");
        }
        setActivity(true);
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), 3000)
        );
        // Use Promise.race to race the location request against the timeout
        try {
            liveLocation = await Promise.race([
                Location.getCurrentPositionAsync(),
                timeoutPromise,
            ]);
            setActivity(false);
            setLModal(false);
            setLocation(liveLocation);
            // console.log("current location : ", liveLocation);
            setModal(true);
            if (
                Math.abs(
                    truncateNumber(liveLocation.coords.latitude) -
                        truncateNumber(shiftLocation.latitude)
                ) <= 0.0015 &&
                Math.abs(
                    truncateNumber(liveLocation.coords.longitude) -
                        truncateNumber(shiftLocation.longitude)
                ) <= 0.0015
            ) {
                setInLocation(true);
            } else {
                setInLocation(false);
            }
        } catch (error) {
            setActivity(false);
            if (error) {
                setLModal(true);
            }
        }
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
    }, [isConnected]);

    const onRefresh = () => {
        setRefreshing(true);
        checkInternetConnection();
    };

    const handleNotConnected = () => {
        setNetModal(false);
    };

    const handleLModal = () => {
        setLModal(false);
    };

    const renderRecords = ({ item }) => {
        return (
            <View>
                <View className="bg-[#f0f4ff] shadow-md shadow-slate-500 my-1 px-4 py-3 flex flex-row justify-between items-center rounded-lg">
                    <View className={`w-28 flex items-center justify-center `}>
                        <Text
                            className={`text-center font-[Nunito-SemiBold] ${item.attendance ? "text-[#291d89]" : "text-red-600"}`}
                        >
                            {attendanceDate[item.id - 1]}
                        </Text>
                    </View>
                    <View className="w-32 flex items-center justify-center">
                        <Text
                            className="text-center text-[#291d89] font-[Nunito-SemiBold]"
                            numberOfLines={2}
                        >
                            {item.location}
                        </Text>
                    </View>
                    <View className="w-32 flex items-center justify-center">
                        {item.attendance ? (
                            <FontAwesome6
                                name="person-circle-check"
                                size={24}
                                color="#16a34a"
                            />
                        ) : (
                            <FontAwesome6
                                name="person-circle-xmark"
                                size={24}
                                color="#dc2626"
                            />
                        )}
                    </View>
                    {/* <ActivityIndicator /> */}
                    <View className="w-16 flex items-center justify-center">
                        <Text className="text-center text-[#291d89] font-[Nunito-SemiBold]">
                            {item.hours}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f0f4ff]">
            {activity && <Loader />}
            <AlertModal
                isVisible={netModal}
                header="Alert"
                content="You are not connected to internet"
                handleModal={handleNotConnected}
                button="OK"
            />
            <AlertModal
                isVisible={lModal}
                header="Alert"
                content="Enable Location to proceed"
                handleModal={handleLModal}
                button="OK"
            />
            <AlertModal
                isVisible={modal}
                content={
                    inLocation
                        ? "Location Confirmed"
                        : "You are not in the location. Please go to the LOCATION and try again"
                }
                header="Alert"
                button="OK"
                handleModal={handleModal}
            />
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView
                className="bg-[#f0f4ff] px-5 w-full mb-24"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="flex items-center justify-center flex-col w-full">
                    <View className="my-5 w-full">
                        <Text className="text-[#291d89] font-[Nunito-Regular] text-4xl">
                            Hello,{" "}
                            <Text className="font-[Nunito-Bold]">{user}</Text>
                        </Text>
                        <Text className="text-[#291d89] font-[Nunito-Regular] text-xl">
                            Nice to have you back
                        </Text>
                    </View>
                    <View className="bg-[#291d89] w-full flex items-center justify-center flex-row px-5 py-3 my-5 rounded-xl shadow-xl shadow-slate-900">
                        <View className="flex flex-col items-center justify-center w-full basis-[50%]">
                            <View className="bg-[#4e67eb] h-16 w-16 flex items-center justify-center rounded-full shadow-30">
                                <Entypo
                                    name="check"
                                    size={30}
                                    color="#f0f4ff"
                                />
                            </View>
                            <View>
                                <Text className="text-[#f0f4ff] font-[Nunito-Regular] text-lg text-center">
                                    Monthly Attendance
                                </Text>
                                <Text className="text-[#f0f4ff] font-[Nunito-Bold] text-lg text-center">
                                    25/30(demo)
                                </Text>
                            </View>
                        </View>
                        <View className="h-full w-0.5 mx-2 bg-[#4e67eb]"></View>
                        <View className="flex flex-col items-center justify-start w-full basis-[50%]">
                            <View className="bg-[#4e67eb] h-16 w-16 flex items-center justify-center rounded-full shadow-30">
                                <FontAwesome
                                    name="rupee"
                                    size={30}
                                    color="#f0f4ff"
                                />
                            </View>
                            <View>
                                <Text className="text-[#f0f4ff] font-[Nunito-Regular] text-lg text-center">
                                    Monthly Payroll
                                </Text>
                                <Text className="text-[#f0f4ff] font-[Nunito-Bold] text-lg text-center">
                                    25,000/-(demo)
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Location Details */}
                    <View className="w-full my-5">
                        <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-2xl">
                            Attendance Management
                        </Text>
                        <TouchableOpacity
                            className="w-full my-4 h-40 flex items-center justify-center bg-[#f0f4ff] rounded-xl shadow-lg shadow-slate-900 border-dashed border-2 border-slate-900"
                            onPress={handleLocation}
                        >
                            <Feather name="camera" size={40} color="#291d89" />
                            <Text className="text-[#291d89] font-[Nunito-SemiBold]">
                                Add Here
                            </Text>
                        </TouchableOpacity>
                        {location && (
                            <View className="-mt-1 flex items-center justify-end flex-row">
                                <MaterialIcons
                                    name={
                                        inLocation
                                            ? "location-on"
                                            : "location-off"
                                    }
                                    size={24}
                                    color={inLocation ? "#16a34a" : "#dc2626"}
                                />
                                <Text
                                    className={`text-right mr-2 ${inLocation ? "font-[Nunito-SemiBold] text-green-600" : "font-[Nunito-SemiBold] text-red-600"}`}
                                >
                                    {inLocation
                                        ? "Location Confirmed"
                                        : "You are not in the current Location"}
                                </Text>
                            </View>
                        )}
                    </View>
                    {/* Shift Details */}
                    <View className="w-full mb-5">
                        <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-2xl">
                            Shift Details
                        </Text>
                        <View className="w-full flex items-center flex-row mt-4">
                            <View className="bg-[#4e67eb] w-20 h-20 mx-5 flex items-center justify-center rounded-full shadow-lg shadow-slate-900">
                                <Entypo
                                    name="clock"
                                    size={40}
                                    color="#f0f4ff"
                                />
                            </View>
                            <View className="basis-[80%]">
                                <Text className="font-[Nunito-Bold] text-xl mb-1">
                                    Current Shift: 5hrs
                                </Text>
                                <Text className="text-lg text-red mr-5 font-[Nunito-Regular]">
                                    {date.toLocaleDateString()}
                                    <Text className="font-[Nunito-Bold]">
                                        {", " + shiftDetails}
                                    </Text>{" "}
                                    {", " + shiftAddress}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Weekly Record */}
                    <View className="w-full mb-5">
                        <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-2xl">
                            {date.toUTCString()}
                        </Text>
                        <View className="flex items-center justify-center">
                            <ScrollView
                                horizontal={true}
                                className="flex flex-row mt-2"
                            >
                                {datesArray.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            className="relative flex items-center justify-center flex-col bg-[#4e67eb] mx-2 my-2 p-2 py-2.5 w-11 rounded-md shadow shadow-slate-900"
                                            onPress={() => {
                                                setCurr(item);
                                            }}
                                        >
                                            <Text
                                                className={`font-[Nunito-SemiBold] text-[#f0f4ff] mb-2`}
                                            >
                                                {item}
                                            </Text>

                                            {curr === item ? (
                                                <View className="h-7 w-7 bg-[#f0f4ff] rounded-full flex items-center justify-center">
                                                    <Text className="text-center text-secondary font-[Nunito-Bold]">
                                                        {daysArray[key]}
                                                    </Text>
                                                </View>
                                            ) : (
                                                <View className="h-7 w-7 flex items-center justify-center">
                                                    <Text className="text-center text-background font-[Nunito-SemiBold]">
                                                        {daysArray[key]}
                                                    </Text>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    {/* Attendance Record */}
                    <View className="w-full mb-5">
                        <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-2xl">
                            Attendance Record
                        </Text>
                        <ScrollView className="mt-4" horizontal={true}>
                            <View className="">
                                <View className="bg-[#4E67EB] mx-2 px-4 py-3 flex flex-row justify-between items-center shadow-md shadow-slate-500 rounded-lg">
                                    <View className="w-28  flex items-center justify-center">
                                        <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                            Date
                                        </Text>
                                    </View>
                                    <View className="w-32 flex items-center justify-center">
                                        <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                            Location
                                        </Text>
                                    </View>
                                    <View className="w-32  flex items-center justify-center">
                                        <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                            Attendance
                                        </Text>
                                    </View>
                                    <View className="w-16  flex items-center justify-center">
                                        <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                            Hours
                                        </Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={attendanceRecords}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderRecords}
                                    horizontal={false}
                                    className="px-2 pb-5"
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default index;
