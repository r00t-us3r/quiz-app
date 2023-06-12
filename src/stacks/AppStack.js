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
            <Drawer.Screen component={QuizesScreen} name="QuizList" options={{headerTitle: 'Quiz List'}} />

            {/* Sub-screens */}
            <Drawer.Screen component={ChatsScreen} name="ChatList" options={{headerTitle: 'Chat List'}} />
            <Drawer.Screen component={EarnCoinsScreen} name="EarnCoins" options={{headerTitle: 'Earn Coins'}} />
            <Drawer.Screen component={LeaderboardScreen} name="Leaderboard" options={{headerTitle: 'Leaderboard'}} />
            <Drawer.Screen component={NotificationsScreen} name="Notifications" options={{headerTitle: 'Notifications'}} />
            <Drawer.Screen component={ProfileScreen} name="Profile" options={{headerTitle: 'Profile'}} />
            <Drawer.Screen component={SettingsScreen} name="Settings" options={{headerTitle: 'Settings'}} />

            {/* View Chat */}
            <Drawer.Screen component={ChatViewScreen} name="Chat" options={{headerTitle: 'Chat List'}} />

            {/* Quizes */}
            <Drawer.Screen component={QuizScreen} name="Quiz" options={{headerTitle: 'Quiz'}} />
            <Drawer.Screen component={GameOverScreen} name="Game Over" options={{headerTitle: 'Game Over'}} />
        </Drawer.Group>
    )
}