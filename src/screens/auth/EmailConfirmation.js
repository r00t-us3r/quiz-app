import {Text, TouchableOpacity, View} from "react-native";
import {authenticate} from "../../services/auth";

export const EmailConfirmation = (props) => {

    const {params} = props.route;

    const login = async () => {
        const resp = await authenticate(params.loginUsername, params.loginPassword)
        if (!resp) {
            console.log('unable to log user in');
        }
    }

    return (
        <View style={{backgroundColor: '#3b404e', height: '100%'}}>
            <View style={{alignSelf: 'center', marginVertical: 24, width: '90%'}}>
                <View style={{backgroundColor: 'rgba(0,236,28,0.3)', borderRadius: 12, padding: 24}}>
                    <Text style={{color: 'white', paddingVertical: 8}}>An e-mail has been sent to {params.loginUsername}.</Text>
                    <Text style={{color: 'white', paddingVertical: 8}}>Please click the link in the e-mail to confirm your account.</Text>
                </View>

                <TouchableOpacity style={{alignSelf: 'center', borderColor: "white", borderRadius: 25, borderWidth: 1, marginHorizontal: 24, marginVertical: 24, padding: 12, width: '80%'}} onPress={login}>
                    <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 14, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>Account Confirmed</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}