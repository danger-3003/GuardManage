/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, TouchableHighlight } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React, { useState } from "react";

const Payroll = () => {
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

    const [curr,setCurr] = useState(date.getDate());
    const [present, setPresent] = useState(true);
    const [absent, setAbsent] = useState(false);

    const presentRecords = ({ item }) => {
        return (
            <View>
                {
                    item.attendance &&
                    <View className="bg-[#f0f4ff] shadow-md shadow-slate-500 my-1 px-4 py-3 flex flex-row justify-between items-center rounded-lg">
                        <View className={`w-28 flex items-center justify-center `}>
                            <Text
                                className={`text-center font-[Nunito-SemiBold] ${item.attendance ? "text-[#291d89]" : "text-red"}`}
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
                        {/* <ActivityIndicator /> */}
                        <View className="w-16 flex items-center justify-center">
                            <Text className="text-center text-[#291d89] font-[Nunito-SemiBold]">
                                {item.hours}
                            </Text>
                        </View>
                        <View className={`w-28 flex items-center justify-center `}>
                            <Text
                                className={`text-center font-[Nunito-SemiBold] text-green`}
                            >
                                +1000/-
                            </Text>
                        </View>
                    </View>
                }
            </View>
        );
    };

    const absentRecords = ({ item }) => {
        return (
            <View>
                {
                    !item.attendance &&
                    <View className="bg-[#f0f4ff] shadow-md shadow-slate-500 my-1 px-4 py-3 flex flex-row justify-between items-center rounded-lg">
                        <View className={`w-28 flex items-center justify-center `}>
                            <Text
                                className={`text-center font-[Nunito-SemiBold] ${item.attendance ? "text-[#291d89]" : "text-red"}`}
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
                        {/* <ActivityIndicator /> */}
                        <View className="w-16 flex items-center justify-center">
                            <Text className="text-center text-[#291d89] font-[Nunito-SemiBold]">
                                {item.hours}
                            </Text>
                        </View>
                        <View className={`w-28 flex items-center justify-center `}>
                            <Text
                                className={`text-center font-[Nunito-SemiBold] text-red`}
                            >
                                +0/-
                            </Text>
                        </View>
                    </View>
                }
            </View>
        );
    };

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className="px-5 pt-7 pb-10 mb-24 bg-background">
                <View className="bg-primary w-full flex items-center justify-between flex-row px-5 py-4 rounded-xl shadow-md shadow-slate-900">
                    <View className="flex items-center justify-center flex-row gap-5">
                        <View className="bg-secondary rounded-full fles items-center justify-center w-16 h-16">
                            <FontAwesome name="rupee" size={30} color="#f0f4ff" />
                        </View>
                        <View>
                            <Text className="text-background font-[Nunito-Regular] mb-2">Monthly Payroll</Text>
                            <Text className="font-[Nunito-Bold] text-4xl text-background">16,000/-</Text>
                        </View>
                    </View>
                    <View className="mr-4">
                        <Image source={require("../../assets/images/MoneyWithWings.gif")} className="w-20 h-20"></Image>
                    </View>
                </View>
                {/* Weekly Record */}
                <View className="w-full my-5">
                    <Text className="font-[Nunito-Bold] text-primary text-2xl">Working Hours</Text>
                    <View className="w-full mt-5">
                        <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-xl">
                            {date.toUTCString()}
                        </Text>
                        <View className="flex items-center justify-center">
                            <ScrollView
                                horizontal={true}
                                className="flex flex-row mt-1"
                            >
                                {datesArray.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            className="relative flex items-center justify-center flex-col bg-[#4e67eb] mx-2 my-2 p-2 py-2.5 w-11 rounded-md shadow shadow-slate-900"
                                            onPress={()=>{setCurr(item)}}
                                        >
                                            <Text
                                                className={`font-[Nunito-SemiBold] text-[#f0f4ff] mb-2`}
                                            >
                                                {daysArray[key]}
                                            </Text>
                                            {
                                                (curr===item)?
                                                <View className="h-7 w-7 bg-[#f0f4ff] rounded-full flex items-center justify-center">
                                                    <Text className="text-center text-secondary font-[Nunito-Bold]">{item}</Text>
                                                </View>
                                                :
                                                <View className="h-7 w-7 flex items-center justify-center">
                                                    <Text className="text-center text-background font-[Nunito-SemiBold]">{item}</Text>
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                        <View className="mt-3">
                            <Text className="text-[#6c6c6c] font-[Nunito-SemiBold] text-[1.3rem]">
                                Working Hours
                            </Text>
                            <View className="flex items-center justify-start flex-row gap-1 my-1">
                                <MaterialCommunityIcons name="av-timer" size={26} color="#ef4444"/>
                                <Text className="font-[Nunito-Regular] text-lg">6h 30m</Text>
                            </View>
                        </View>
                        <View className="h-0.5 mt-2 bg-[#6c6c6c] w-full rounded-full"></View>
                    </View>
                </View>
                {/* Attendance Record */}
                <View className="bg-primary w-full flex items-center justify-between flex-row px-3 py-3 rounded-xl shadow-md shadow-slate-900">
                    <View className="flex items-center justify-center flex-row gap-3 py-5">
                        <View className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center">
                            <SimpleLineIcons name="badge" size={28} color="#f0f4ff"/>
                        </View>
                        <View className="">
                            <Text className="text-background font-[Nunito-Regular]">Monthly Bonus</Text>
                            <Text className="text-background font-[Nunito-Bold] text-xl">5%</Text>
                        </View>
                    </View>
                    <View className="bg-secondary h-full w-0.5 rounded-full"></View>
                    <View className="flex items-center justify-start flex-row gap-3 py-5">
                        <View className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center">
                        <FontAwesome name="rupee" size={28} color="#f0f4ff"/>
                        </View>
                        <View className="">
                            <Text className="text-background font-[Nunito-Regular]">Monthly Deductions</Text>
                            <Text className="text-background font-[Nunito-Bold] text-xl">1000/-</Text>
                        </View>
                    </View>
                </View>
                {/* Overall Record */}
                <View className="my-5 w-full">
                    <Text className="text-primary font-[Nunito-Bold] text-2xl">Attedance Record</Text>
                    <ScrollView horizontal={true} className="py-5">
                        <TouchableOpacity className="bg-[#87FF74] w-32 rounded-xl px-5 py-3 mx-2 shadow shadow-slate-900" onPress={()=>{setPresent(true);setAbsent(false)}}>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#003005]">20</Text>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#003005]">Present</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#ffb1b1] w-32 rounded-xl px-5 py-3 mx-2 shadow shadow-slate-900" onPress={()=>{setPresent(false);setAbsent(true)}}>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#bb0606]">2</Text>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#bb0606]">Absent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#ffb1b1] rounded-xl px-5 py-3 mx-2 shadow shadow-slate-900">
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#bb0606]">4</Text>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#bb0606]">Half Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#87FF74] min-w-32 rounded-xl px-5 py-3 mx-2 shadow shadow-slate-900">
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#003005]">2</Text>
                            <Text className="font-[Nunito-SemiBold] text-xl text-[#003005]">Paid Leaves</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {
                    present && 
                    <ScrollView className="mt-4" horizontal={true}>
                        <View className="px-5 -mx-5 mb-10">
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
                                <View className="w-16  flex items-center justify-center">
                                    <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                        Hours
                                    </Text>
                                </View>
                                <View className="w-28 flex items-center justify-center">
                                    <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                        Salary
                                    </Text>
                                </View>
                            </View>
                            <FlatList
                                data={attendanceRecords}
                                keyExtractor={(item) => item.id}
                                renderItem={presentRecords}
                                horizontal={false}
                                className="px-2 pb-5"
                            />
                        </View>
                    </ScrollView>
                }
                {
                    absent &&
                    <ScrollView className="mt-4" horizontal={true}>
                        <View className="px-5 -mx-5 mb-10">
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
                                <View className="w-16  flex items-center justify-center">
                                    <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                        Hours
                                    </Text>
                                </View>
                                <View className="w-28 flex items-center justify-center">
                                    <Text className="text-center text-[#f0f4ff] font-[Nunito-Bold] text-lg">
                                        Salary
                                    </Text>
                                </View>
                            </View>
                            <FlatList
                                data={attendanceRecords}
                                keyExtractor={(item) => item.id}
                                renderItem={absentRecords}
                                horizontal={false}
                                className="px-2 pb-5"
                            />
                        </View>
                    </ScrollView>
                }
            </ScrollView>
        </>
    );
};

export default Payroll;
