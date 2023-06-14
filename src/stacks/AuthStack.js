import { createStackNavigator } from "@react-navigation/stack";
import {LoginScreen} from "../screens/auth/LoginScreen";
import {View} from "react-native";
import {EmailConfirmation} from "../screens/auth/EmailConfirmation";
import {RegisterScreen} from "../screens/auth/RegisterScreen";

const screenOptions = {
    header: () => null,
};

const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} options={{headerShown: false}} />
        </>
    );
};
