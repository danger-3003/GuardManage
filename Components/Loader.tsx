/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
import { View, Text } from "react-native";
import { ActivityIndicator, Modal } from "react-native";

const Loader = () => {
    return (
        <View className="">
            <Modal transparent={true} className="">
                <ActivityIndicator color="#f0f4ff" size="large" className="flex-1 items-center justify-center bg-[#00000031]" />
            </Modal>
        </View>
    );
};

export default Loader;
