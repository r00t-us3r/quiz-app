import { createStackNavigator } from "@react-navigation/stack";
import {LoginScreen} from "../screens/auth/LoginScreen";
import {View} from "react-native";

const screenOptions = {
    header: () => null,
};

const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
    );
};
