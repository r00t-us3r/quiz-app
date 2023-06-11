import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import {AccessToken, LoginButton} from 'react-native-fbsdk-next';
import FBLoginButton from "react-native-fbsdk-next/src/FBLoginButton";
import {SafeAreaContext, SafeAreaProvider} from "react-native-safe-area-context";

import { Icon } from "@rneui/base";
import {LoginScreen} from "./src/screens/auth/LoginScreen";
import {AuthStack} from "./src/stacks/AuthStack";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {Provider, useDispatch, useSelector} from "react-redux";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold, Outfit_800ExtraBold,
  useFonts
} from "@expo-google-fonts/outfit";

import { Store } from "./src/redux/Store";
import {AppStack} from "./src/stacks/AppStack";

import {Settings} from "react-native-fbsdk-next"
import {useEffect} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          color: "white",
          marginBottom: 10,
          fontFamily: "Outfit_600SemiBold",
        }}>
        Loading ...
      </Text>
      <ActivityIndicator color="white" />
    </View>
  );
}

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Navigator = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(authState);
  }, [authState])

  if (authState.isLoading) {
    return <SplashScreen />;
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
          style={{ flex: 1, margin: 0, padding: 0, backgroundColor: "" }}>
        {/*<Stack.Navigator>{AuthStack()}</Stack.Navigator>*/}
        <NavigationContainer>
          <Drawer.Navigator
              initialRouteName={"Settings"} screenOptions={{
            color: "white",
            drawerPosition: 'left',
            drawerStyle: {
              backgroundColor: 'white',
              zIndex: 100
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#3b404e',
              borderBottomWidth: 0,
            },
            headerStatusBarHeight: 0,
            headerTintColor: "white",
          }}>
            {authState.userToken ? AppStack() : AuthStack()}
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_500Medium,
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  Settings.initializeSDK();

  return (
    // <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#3b404e" }}>
        <Provider store={Store}>
          <Navigator style={styles.container} />
        </Provider>
        <StatusBar style="light" />
        {/*<FlashMessage position="top" duration={3500} />*/}
      </GestureHandlerRootView>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#3b404e',
    flex: 1,
  },
});
