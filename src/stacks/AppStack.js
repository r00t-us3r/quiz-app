import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from "@react-navigation/stack";
import {ChatsScreen} from "../screens/app/ChatsScreen";
import {ChatViewScreen} from "../screens/app/ChatViewScreen";
import {SettingsScreen} from "../screens/app/SettingsScreen";
import {ProfileScreen} from "../screens/app/ProfileScreen";
import {NotificationsScreen} from "../screens/app/NotificationsScreen";
import {LeaderboardScreen} from "../screens/app/LeaderboardScreen";
import {GameOverScreen} from "../screens/app/GameOverScreen";
import {EarnCoinsScreen} from "../screens/app/EarnCoinsScreen";
import {QuizesScreen} from "../screens/app/QuizesScreen";
import {QuizScreen} from "../screens/app/QuizScreen";
import {Text, View} from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AppStack = () => {
    return (
        <Drawer.Group screenOptions={{
                drawerType: 'front'
            }}>
            {/* Main Screen */}
            <Drawer.Screen component={QuizesScreen} name="Quizes" />

            {/* Sub-screens */}
            <Drawer.Screen component={ChatsScreen} name="Chats" />
            <Drawer.Screen component={EarnCoinsScreen} name="Earn Coins" />
            <Drawer.Screen component={LeaderboardScreen} name="Leaderboard" />
            <Drawer.Screen component={NotificationsScreen} name="Notifications" />
            <Drawer.Screen component={ProfileScreen} name="Profile" />
            <Drawer.Screen component={SettingsScreen} name="Settings" />

            {/* View Chat */}
            <Drawer.Screen component={ChatViewScreen} name="Chat" />

            {/* Quizes */}
            <Drawer.Screen component={QuizScreen} name="Quiz" />
            <Drawer.Screen component={GameOverScreen} name="Game Over" />
        </Drawer.Group>
    )
}