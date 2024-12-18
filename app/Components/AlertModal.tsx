/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React,{ useState} from "react";
import {Modal, View, StatusBar, Text} from "react-native";
import { TouchableRipple } from 'react-native-paper';

const AlertModal=({isVisible,handleModal,content,header,button})=>{
    return(
        <>
        {/* <StatusBar hidden={true}/> */}
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <View className="flex-1 items-center justify-center bg-[#0000008a]" style={{backgroundColor:"#0000008a"}}>
                <View className="bg-[#d2e1ff] rounded-3xl flex items-start justify-center flex-col p-7 w-[85%]">
                    {header &&<Text className="text-left text-primary text-3xl font-[Roboto-Regular]">{header}</Text>}
                    <Text className=" text-primary my-3 font-[Roboto-Regular]">{content}.</Text>
                    <TouchableRipple onPress={handleModal} className="py-3 w-full" rippleColor="#4e67eb2a">
                        <View className="flex items-start justify-start gap-3 w-32 flex-row">
                            {/* <MaterialIcons name="check" size={24} color="#291d89" /> */}
                            <Text className="text-left text-xl text-primary font-[Roboto-Regular]">{button}</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        </Modal>
        </>
    );
}

export default AlertModal;