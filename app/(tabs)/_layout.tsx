/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Tabs } from "expo-router";
import colorsDefault from "../../assets/colors/colors";
import { View, Text, Pressable } from "react-native";
// import { useLinkBuilder } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../assets/colors/colors";

function MyTabBar({ state, descriptors, navigation }) {
    // const { buildHref } = useLinkBuilder();

    return (
        <View className="flex flex-row items-end absolute bottom-5 mx-5 bg-[#291d89] rounded-full px-5 py-3 shadow-md shadow-slate-800">
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                const isFocused = state.index === index;

                const icons = {
                    index: (props: any) => (
                        <Ionicons
                            name={isFocused ? "home" : "home-outline"}
                            size={24}
                            color={colorsDefault.secondary}
                            {...props}
                        />
                    ),
                    Payroll: (props: any) => (
                        <FontAwesome
                            name="rupee"
                            size={24}
                            color={colorsDefault.secondary}
                            {...props}
                        />
                    ),
                    Profile: (props: any) => (
                        <Ionicons
                            name={isFocused ? "person" : "person-outline"}
                            size={28}
                            color={colorsDefault.secondary}
                            {...props}
                        />
                    ),
                };

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={index}
                        // ref={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 relative h-14 items-center justify-end"
                    >
                        <View
                            className={`flex items-center justify-center rounded-full shadow-lg shadow-black absolute ${
                                isFocused
                                    ? "bg-[#4E67EB] -top-10 h-16 w-16"
                                    : "top-0"
                            }`}
                        >
                            {icons[route.name]({
                                color: colorsDefault.secondary,
                                size: isFocused ? 28 : 24,
                            })}
                        </View>
                        <Text
                            className={`${
                                isFocused ? "font-[Nunito-Bold] text-xl" : "text-base font-[Nunito-Regular]"
                            }`}
                            style={{
                                color: isFocused
                                    ? colorsDefault.secondary
                                    : colorsDefault.secondary,
                            }}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const tabLayout = () => {
    return (
        <>
            <Tabs tabBar={(props) => <MyTabBar {...props} />}>
                <Tabs.Screen 
                    name="index" 
                    options={
                        { 
                            headerTitle:()=><Text className={`font-[Nunito-Bold] text-2xl text-[${colors.primary}]`}>Home</Text>,
                            headerTitleAlign:'center',
                            tabBarLabel:"Home"
                        }}
                />
                <Tabs.Screen
                    name="Payroll"
                    options={{ headerTitle:()=><Text className={`font-[Nunito-Bold] text-2xl text-[${colors.primary}]`}>Payroll</Text>,headerTitleAlign:'center'}}
                />
                <Tabs.Screen
                    name="Profile"
                    options={{ headerTitle:()=><Text className={`font-[Nunito-Bold] text-2xl text-[${colors.primary}]`}>Profile</Text>,headerTitleAlign:'center'}}
                />
            </Tabs>
        </>
    );
};

export default tabLayout;
