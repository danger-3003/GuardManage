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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AlertModal from "../../Components/AlertModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [modalForgetPass,setModalForgetPass]=useState(false);
    const [userDetails, setUserDetails] = useState({name:"",password:""});
    const [isEmpty, setIsEmpty] = useState(false);
    
    const handleShowPassword=()=>{
        setShowPass(!showPass);
    };
    
    const handleForgotPassModal=()=>{
        setModalForgetPass(false);
    }

    const handleEmpty=()=>{
        setIsEmpty(false);
    }

    const handleLogin=async()=>{
        try{
            if(userDetails.name && userDetails.password){
                await AsyncStorage.setItem('isLogin',"true");
                await AsyncStorage.setItem('userName',userDetails.name);
                router.replace("/(tabs)");
            }
            else{
                setIsEmpty(true);
            }
        }
        catch(err){alert(err)}
    };
    return (
        <LinearGradient
            colors={['#291D89','#7184E4']}
            className="flex-1 px-5 pt-6"
            start={{x:0,y:0}}
            end={{x:1,y:1}}
        >
            <View
                className="absolute bg-[#7687df] h-40 w-40 rounded-full blur-3xl backdrop-blur-3xl"
                style={{ left: -50, top: 10, zIndex: 1 }}
            ></View>
            <View className="h-screen flex-1 justify-between">
                <View className="my-10 flex flex-col items-end justify-center">
                    <Text className="text-[#f0f4ff] font-[Nunito-Bold] text-4xl">
                        Welcome Back
                    </Text>
                    <Text className="text-[#f0f4ff] font-[Nunito-Regular] text-xl">
                        Please Login to continue
                    </Text>
                </View>
                <View
                    className="rounded-t-[2rem] bg-[#f0f4ff] px-5 pb-10"
                    style={{ zIndex: 1}}
                >
                    <View>
                        <Text className="text-[#291D89] text-center font-[Nunito-Bold] text-3xl py-7">
                            User Details
                        </Text>
                    </View>
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Username
                        </Text>
                        <View className="border border-[#291d89] rounded-xl h-14 flex flex-row justify-around items-center w-[100%]">
                            <TextInput
                                placeholder="Enter Username"
                                numberOfLines={1}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] basis-[90%] ml-2"
                                onChangeText={(text)=>{setUserDetails({...userDetails,name:text})}}
                            />
                            <FontAwesome5
                                name="user"
                                size={18}
                                color="#291D89"
                                className="basis-[10%] -ml-5"
                            />
                        </View>
                    </View>
                    <View>
                        <Text className="font-[Nunito-SemiBold] text-[#291D89] text-xl my-2">
                            Password
                        </Text>
                        <View className="border border-[#291d89] rounded-xl h-14 flex flex-row justify-around items-center w-[100%]">
                            <TextInput
                                placeholder="Enter your Password"
                                numberOfLines={1}
                                secureTextEntry={!showPass}
                                className="font-[Nunito-Regular] text-lg text-[#291D89] basis-[90%] ml-2"
                                onChangeText={(text)=>{setUserDetails({...userDetails,password:text})}}
                            />
                            <Pressable className="basis-[10%] -ml-5" onPress={handleShowPassword}>
                                <Ionicons name={showPass?"eye-off-outline":"eye-outline"} size={18} color="#291D89"/>
                            </Pressable>
                        </View>
                    </View>
                    <View className="flex items-end justify-center">
                        <Text className="font-[Nunito-Regular] text-[#4E67EB]" style={{marginTop:5}} onPress={()=>{setModalForgetPass(true);}}>Forgot Password ?</Text>
                    </View>
                    <TouchableOpacity className="rounded-xl mt-32 py-3 bg-[#4E67EB] shadow-md shadow-blue-400" onPress={handleLogin}>
                        <Text className="text-center text-[#f0f4ff] text-xl font-[Nunito-Bold]">
                            Log In
                        </Text>
                    </TouchableOpacity>
                    <View className="my-3">
                        <Text className="text-center font-[Nunito-Regular]">Didn't have an Account? <Text className="text-[#4E67EB]" onPress={()=>{router.navigate("/Authentication/Register")}}>Register here</Text></Text>
                    </View>
                </View>
                <AlertModal isVisible={modalForgetPass} handleModal={handleForgotPassModal} content="To reset your password, you will be directed to our website." header="Alert" button="Okay"/>
                <AlertModal isVisible={isEmpty} handleModal={handleEmpty} content="Please fill all the fields" header="Alert" button="Okay"/>
            </View>
        </LinearGradient>
    );
};

export default Login;
