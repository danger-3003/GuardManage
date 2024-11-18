/* eslint-disable prettier/prettier */
import "../global.css";
import { Stack } from "expo-router/stack";
export default function Layout() {
    return (
        <Stack
            screenOptions={{
                animation: "slide_from_right",
                animationTypeForReplace: "push",
                headerShown:false
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="Authentication/Layout"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Authentication/Register"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Authentication/Login"
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="(tabs)"
                options={{ headerShown:false }}
            />
        </Stack>
    );
}
