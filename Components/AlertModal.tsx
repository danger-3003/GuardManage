/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React,{ useState} from "react";
import {Modal, View, Text, Pressable} from "react-native";
const AlertModal=({isVisible,handleModal,content,header,button})=>{
    return(
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <View className="flex-1 items-center justify-center bg-[#0000008a]" style={{backgroundColor:"#0000008a"}}>
                <View className="bg-[#e6e6e6] rounded-2xl flex items-center justify-center flex-col pt-7 w-[60%]" style={{backgroundColor:"#e6e6e6"}}>
                    {header &&<Text className="text-center text-2xl mb-1 font-bold">{header}</Text>}
                    <Text className="text-center text-md px-5">{content}</Text>
                    <View className="h-[0.5] w-full bg-[#291D89] mt-5"></View>
                    <Pressable onPress={handleModal} className="py-3 w-full">
                        <Text className="text-center text-lg text-[#007aff] font-semibold">{button}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default AlertModal;