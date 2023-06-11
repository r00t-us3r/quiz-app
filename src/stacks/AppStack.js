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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AppStack = () => {
    return (
        <Drawer.Group>
            {/* Main Screen */}
            <Drawer.Screen component={QuizesScreen} name="QuizList" />

            {/* Sub-screens */}
            <Drawer.Screen component={ChatsScreen} name="ChatList" />
            <Drawer.Screen component={EarnCoinsScreen} name="EarnCoins" />
            <Drawer.Screen component={LeaderboardScreen} name="Leaderboard" />
            <Drawer.Screen component={NotificationsScreen} name="Notifications" />
            <Drawer.Screen component={ProfileScreen} name="Profile" />
            <Drawer.Screen component={SettingsScreen} name="Settings" />

            {/* View Chat */}
            <Drawer.Screen component={ChatViewScreen} name="ViewChat" />

            {/* Quizes */}
            <Drawer.Screen component={QuizScreen} name="ViewQuiz" />
            <Drawer.Screen component={GameOverScreen} name="GameOver" />
        </Drawer.Group>
    )
}