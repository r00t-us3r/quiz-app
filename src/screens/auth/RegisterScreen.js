import {Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import {AccessToken, LoginManager} from "react-native-fbsdk-next";
import {useCallback, useMemo, useRef, useState} from "react";
import {superBase} from "../../services/superBase";
import {showMessage} from "react-native-flash-message";

import * as RootApp from "../../../App";
import {uuid} from "@supabase/supabase-js/src/lib/helpers";
import Spinner from "react-native-loading-spinner-overlay";

export const RegisterScreen = ({navigation: navigation}) => {

    const [registerUsername, setRegisterUsername] = useState(uuid().toString() + "@deancole.info")
    const [registerPassword, setRegisterPassword] = useState("")
    const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("")
    const [loading, setLoading] = useState(false);

    // const continueWithFacebook = () => {
    //     LoginManager.logInWithPermissions(["public_profile"]).then((result) => {
    //         if (result.isCancelled) {
    //             console.log('Login cancelled by user"');
    //         } else {
    //             console.log(
    //                 "Login success with permissions: " +
    //                 result.grantedPermissions.toString()
    //             )
    //         }
    //     },
    //     (error) => {
    //         console.log('Login fail with error: ' + error);
    //     })
    // }

    const createAccount = async () => {
        setLoading(true);
        if (registerPassword !== confirmRegisterPassword) {
            showMessage({
                message: 'Passwords do not match. Please check & try again',
                type: 'danger'
            })

            setLoading(false);
        } else if(registerPassword === '') {
            showMessage({
                message: 'Password should be at least 6 characters',
                type: 'danger'
            })

            setLoading(false);
        } else {
            let {data, error} = await superBase.auth.signUp({
                email: registerUsername,
                password: registerPassword
            })

            setTimeout(() => {
                setLoading(false);
                if (error) {
                    showMessage({
                        message: error.message,
                        type: 'danger',
                    });
                } else {
                    RootApp.navigate("EmailConfirmation", {
                        registerUsername,
                        registerPassword,
                        signUpResponse: data
                    })
                }
            }, 1500)
        }

    }

    const login = () => {
        RootApp.navigate("Login");
    }

    return (
        <View style={{backgroundColor: '#3b404e', height: '100%'}}>
            <Spinner
                visible={loading}
                textContent={'Creating account'}
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
                    <TextInput autoCapitalize={"none"} onChangeText={setRegisterUsername} placeholder={"Enter your username"} placeholderTextColor={"#626775"} style={{borderBottomColor: '#626775', fontFamily: 'Rubik-Regular', borderBottomWidth: 2, color: 'white', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} value={registerUsername} />
                </View>
                <View style={{paddingVertical: 12}}>
                    <Text style={{color: '#b1b3b9', fontFamily: 'Rubik-Light', fontSize: 15, width: '100%'}}>Password</Text>
                    <TextInput placeholder={"Enter your new password"} onChangeText={setRegisterPassword} placeholderTextColor={"#626775"} secureTextEntry={true} style={{borderBottomColor: '#626775', borderBottomWidth: 2, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} textContentType={"password"} value={registerPassword} />
                </View>
                <View style={{paddingVertical: 12}}>
                    <Text style={{color: '#b1b3b9', fontFamily: 'Rubik-Light', fontSize: 15, width: '100%'}}>Password</Text>
                    <TextInput placeholder={"Confirm your new password"} onChangeText={setConfirmRegisterPassword} placeholderTextColor={"#626775"} secureTextEntry={true} style={{borderBottomColor: '#626775', borderBottomWidth: 2, color: 'white', fontFamily: 'Rubik-Regular', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} textContentType={"password"} value={confirmRegisterPassword} />
                </View>
            </View>
            <>
                <TouchableOpacity style={{alignSelf: 'center', borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 12, padding: 12, width: '60%'}} onPress={createAccount}>
                    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Create Account</Text>
                </TouchableOpacity>
                <View style={{alignSelf: 'center', borderColor: 'white', borderWidth: 1, width: '20%'}} />
                {/*<TouchableOpacity style={{alignSelf: 'center', borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 12, padding: 8, width: '60%'}} onPress={login}>*/}
                    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 12, fontWeight: 'bold', marginVertical: 12, textAlign: 'center', width: '100%'}} onPress={login}>Already have an account?</Text>
                {/*</TouchableOpacity>*/}
            </>
        </View>
    )
}