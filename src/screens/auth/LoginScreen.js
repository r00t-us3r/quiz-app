import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import {AccessToken, LoginManager} from "react-native-fbsdk-next";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {signIn} from "../../redux/slices/AuthSlice";

export const LoginScreen = ({navigation: navigation}) => {

    const [loginUsername, setLoginUsername] = useState("johnathandoe@email.com")
    const dispatch = useDispatch();

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

    const loginFinished = (error, result) => {
        if (error) {
            console.log("login has error: " + result.error);
        } else if (result.isCancelled) {
            console.log("login is cancelled.");
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log(data.accessToken.toString())
                }
            )
        }
    }

    const logoutFinished = () => {
        console.log('logout.')
    }

    const authenticate = () => {
        dispatch(signIn({ userToken: 'string' }));
    }

    return (
        <View style={{backgroundColor: '#3b404e', height: '100%'}}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../../../assets/favicon.png')} width={40} height={40} />
                <Text style={{color: 'white', fontSize: 36, fontWeight: 'bold', textAlign: 'center'}}>Quiz App</Text>
                <Text style={{color: '#9da0a6', fontSize: 16, textAlign: 'center'}}>Login to continue</Text>
            </View>
            <View style={{marginVertical: 24, paddingHorizontal: 24, width: '100%'}}>
                <View style={{paddingVertical: 24}}>
                    <Text style={{color: '#b1b3b9', fontSize: 15, width: '100%'}}>Username</Text>
                    <TextInput autoCapitalize={"none"} onChangeText={setLoginUsername} placeholder={"Enter your username"} placeholderTextColor={"#626775"} style={{borderBottomColor: '#626775', borderBottomWidth: 2, color: 'white', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} value={loginUsername} />
                </View>
                <View style={{paddingVertical: 12}}>
                    <Text style={{color: '#b1b3b9', fontSize: 15, width: '100%'}}>Password</Text>
                    <TextInput placeholder={"Enter your password"} placeholderTextColor={"#626775"} secureTextEntry={true} style={{borderBottomColor: '#626775', borderBottomWidth: 2, color: 'white', fontSize: 18, fontWeight: 'bold', paddingVertical: 12}} textContentType={"password"}  />
                </View>
            </View>
            <>
                <Text style={{borderBottomColor: '#b1b3b9', borderBottomWidth: 2, color: '#b1b3b9', textAlign: 'right', width: '90%'}}>Forgot Password?</Text>
                <TouchableOpacity style={{borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 24, padding: 12, width: '90%'}} onPress={authenticate}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Continue</Text>
                </TouchableOpacity>
            </>
            <TouchableOpacity onPress={continueWithFacebook} style={{alignContent: 'center', alignItems: 'center', backgroundColor: '#3577d4', bottom: 0, display: 'flex', flexDirection: 'row', left: 0, marginVertical: 24, padding: 12, position: 'absolute', width: '100%'}}>
                <Icon name="facebook-square" type="font-awesome" color="white" />
                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Login with Facebook</Text>
            </TouchableOpacity>
        </View>
    )
}