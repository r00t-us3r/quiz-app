import {
    ActivityIndicator,
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Icon} from "@rneui/base";
import {AccessToken, LoginManager} from "react-native-fbsdk-next";
import {useCallback, useMemo, useRef, useState} from "react";
import {superBase} from "../../services/superBase";
import {showMessage} from "react-native-flash-message";

import * as RootApp from "../../../App";
import {uuid} from "@supabase/supabase-js/src/lib/helpers";
import {create} from "axios";
import Spinner from "react-native-loading-spinner-overlay";

export const LoginScreen = ({navigation: navigation}) => {

    const [loginUsername, setLoginUsername] = useState(uuid().toString() + "@deancole.info")
    const [loginPassword, setLoginPassword] = useState("")

    const continueWithFacebook = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then((result) => {
            if (result.isCancelled) {
                console.log('Login cancelled by user"');
            } else {
                console.log(
                    "Login success with permissions: " +
                    result.grantedPermissions.toString()
                )
            }
        },
        (error) => {
            console.log('Login fail with error: ' + error);
        })
    }

    const forgotPassword = async () => {
        let { data, error } = await superBase.auth.resetPasswordForEmail(loginUsername);
        if (error) {
            showMessage({
                message: error.message,
                type: 'danger',
            });
        } else {
            showMessage({
                message: 'A password reset e-mail has been sent. If you\'re unable to find the e-mail, be sure to check your Junk/Spam folders.',
                type: 'success'
            })
        }
    }

    const login = async () => {
        setLoading(true);
        let { data, error } = await superBase.auth.signInWithPassword({
            email: loginUsername,
            password: loginPassword
        });
        if (error) {
            showMessage({
                message: error.message,
                type: 'danger',
            });
        }
        setLoading(false);
    }

    const createAccount = () => {
        RootApp.navigate("Register");
    }

    const [loading, setLoading] = useState(false);

    return (
        <View style={{backgroundColor: '#3b404e', height: '100%'}}>
            <Spinner
                visible={loading}
                textContent={'Logging in'}
                textStyle={{color: 'white'}}
                overlayColor={'rgba(59,64,78,0.8)'}
            />
            <View style={{alignItems: 'center'}}>
                <Image source={require('../../../assets/favicon.png')} width={40} height={40} />
                <Text style={{color: 'white', fontFamily: 'Rubik-Bold', fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>Quiz App</Text>
                <Text style={{color: '#b1b3b9', fontFamily: 'Rubik-Light', fontSize: 15, textAlign: 'center'}}>Login to continue</Text>
            </View>
            <View style={{alignSelf: 'center', marginVertical: 24, paddingHorizontal: 24, width: '90%'}}>
                <View style={{paddingVertical: 24}}>
                    <Text style={{color: '#b1b3b9', fontFamily: 'Rubik-Light', fontSize: 15, width: '100%'}}>Username</Text>
                    <TextInput autoCapitalize={"none"} onChangeText={setLoginUsername} placeholder={"Enter your username"} placeholderTextColor={"#626775"} style={{borderBottomColor: '#626775', fontFamily: 'Rubik-Regular', borderBottomWidth: 2, color: 'white', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} value={loginUsername} />
                </View>
                <View style={{paddingVertical: 12}}>
                    <Text style={{color: '#b1b3b9', fontFamily: 'Rubik-Light', fontSize: 15, width: '100%'}}>Password</Text>
                    <TextInput placeholder={"Enter your password"} onChangeText={setLoginPassword} placeholderTextColor={"#626775"} secureTextEntry={true} style={{borderBottomColor: '#626775', borderBottomWidth: 2, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} textContentType={"password"} value={loginPassword} />
                </View>
            </View>
            <>
                <Text style={{borderBottomColor: '#b1b3b9', borderBottomWidth: 2, color: '#b1b3b9', fontFamily: 'Rubik-Regular', fontSize: 14, textAlign: 'right', textDecorationStyle: 'solid', textDecorationColor: '#b1b3b9', textDecorationLine: 'underline', width: '90%'}} onPress={forgotPassword}>Forgot Password?</Text>
                <TouchableOpacity style={{alignSelf: 'center', borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 12, padding: 12, width: '80%'}} onPress={login}>
                    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Login</Text>
                </TouchableOpacity>
                <View style={{alignSelf: 'center', borderColor: 'white', borderWidth: 1, width: '20%'}} />
                {/*<TouchableOpacity style={{alignSelf: 'center', borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 12, padding: 12, width: '80%'}} onPress={createAccount}>*/}
                {/*    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Create an Account</Text>*/}
                    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 12, fontWeight: 'bold', marginVertical: 12, textAlign: 'center', width: '100%'}} onPress={createAccount}>Create new account</Text>
                {/*</TouchableOpacity>*/}
            </>
            <TouchableOpacity onPress={continueWithFacebook} style={{alignContent: 'center', alignItems: 'center', backgroundColor: '#3577d4', bottom: 0, display: 'flex', flexDirection: 'row', left: 0, marginVertical: 24, padding: 12, position: 'absolute', width: '100%'}}>
                <Icon name="facebook-square" type="font-awesome" color="white" />
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Login with Facebook</Text>
            </TouchableOpacity>
        </View>
    )
}