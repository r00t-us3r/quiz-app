import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Button, FlatList,
  Image, ListView,
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
import {createNavigationContainerRef, DrawerActions, NavigationContainer} from '@react-navigation/native';
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
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";


import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {HeaderComponent} from "./src/components/drawer/HeaderComponent";
import {FooterComponent} from "./src/components/drawer/FooterComponent";
library.add(fas);


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

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function closeDrawer() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer());
  }
}

const Navigator = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(authState);
  }, [authState])

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  console.log(navigation);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
          style={{ flex: 1, margin: 0, padding: 0, backgroundColor: "" }}>
        {/*<Stack.Navigator>{AuthStack()}</Stack.Navigator>*/}
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator
              drawerContent={(props) => (
                  <View style={{backgroundColor: '#3c4255', height: '100%'}}>
                    <HeaderComponent />
                    {/*<DrawerItemList {...props} />*/}
                    <View style={{marginTop: 'auto'}}>
                      <FooterComponent />
                    </View>
                  </View>
              )}
              initialRouteName={"QuizList"} screenOptions={{
            color: "white",
            swipeEnabled: false,
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
