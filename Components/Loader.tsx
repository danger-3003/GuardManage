/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native";

const Loader = () => {
    return (
        <View className="flex items-center justify-center bg-[#00000050] w-full h-full absolute z-10">
            <ActivityIndicator
                size="large"
                color="white"
                className=""
            />
        </View>
    );
};

export default Loader;
