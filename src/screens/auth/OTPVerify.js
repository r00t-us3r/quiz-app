import {StyleSheet, Text, View} from "react-native";
import OTPInputView from "@backdrop-photo/react-native-otp-input";
import Spinner from "react-native-loading-spinner-overlay";
import {useState} from "react";
import {superBase} from "../../services/superBase";
import {showMessage} from "react-native-flash-message";

export const OTPVerify = (props) => {
    const [loading, setLoading] = useState(false);

    const {params} = props.route;

    const verifyOTP = async (token) => {
        setLoading(true);
        const { data, error } = await superBase.auth.verifyOtp({ email: params.registerUsername, token, type: 'email'})
        if (error) {
            setLoading(false);
            showMessage({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return (
        <View style={{backgroundColor: '#3b404e', height: '100%'}}>
            <Spinner
                visible={loading}
                textContent={'Verifying OTP Code'}
                textStyle={{color: 'white'}}
                overlayColor={'rgba(59,64,78,0.8)'}
            />
            <View style={{alignItems: 'center', alignSelf: 'center', display: 'flex', marginVertical: 24, width: '90%'}}>
                <View style={{backgroundColor: 'rgba(0,236,28,0.3)', borderRadius: 12, padding: 24}}>
                    <Text style={{color: 'white', paddingVertical: 8}}>An e-mail has been sent to {params.registerUsername}.</Text>
                    <Text style={{color: 'white', paddingVertical: 8}}>Please enter the OTP code to verify your account.</Text>
                </View>
                <OTPInputView
                    style={{height: 200, width: '80%'}}

                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code) => verifyOTP(code)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        borderRadius: 5,
        borderWidth: 1,
        fontWeight: 'bold',
        height: 45,
        width: 30,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});