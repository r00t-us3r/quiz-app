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
import {createNavigationContainerRef, DrawerActions, NavigationContainer, useRoute} from '@react-navigation/native';
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
import {DrawerItemsComponent} from "./src/components/drawer/DrawerItemsComponent";
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

export function getRouteName() {
    if (navigationRef.isReady()) {
        return navigationRef.current.getCurrentRoute().name;
    }
}

const Navigator = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  if (authState.isLoading) {
    return <SplashScreen />;
  }

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
                    <DrawerItemsComponent />
                    <View style={{marginTop: 'auto'}}>
                      <FooterComponent />
                    </View>
                  </View>
              )}
              initialRouteName={"QuizList"}
              screenOptions={{
                color: "white",
                swipeEnabled: false,
                drawerPosition: 'left',
                drawerStyle: {
                  backgroundColor: 'white',
                    width: '100%',
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

    // theme fonts

    // Karla
    'Karla-700': require('./assets/fonts/Karla700.ttf'),
    'Karla-700-italic': require('./assets/fonts/Karla700italic.ttf'),
    'Karla-Italic': require('./assets/fonts/Karlaitalic.ttf'),
    'Karla-Regular': require('./assets/fonts/Karlaregular.ttf'),
    // Poppins
    'Poppins-600': require('./assets/fonts/Poppins600.ttf'),
    'Poppins-700': require('./assets/fonts/Poppins700.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppinsregular.ttf'),
    // Rubik
    'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
    'Rubik-BlackItalic': require('./assets/fonts/Rubik-BlackItalic.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'Rubik-BoldItalic': require('./assets/fonts/Rubik-BoldItalic.ttf'),
    'Rubik-Italic': require('./assets/fonts/Rubik-Italic.ttf'),
    'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
    'Rubik-LightItalic': require('./assets/fonts/Rubik-LightItalic.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-MediumItalic': require('./assets/fonts/Rubik-MediumItalic.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
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
