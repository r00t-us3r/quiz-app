import {superBase} from "./superBase";
import {showMessage} from "react-native-flash-message";

export const authenticate = async (loginUsername, loginPassword) => {
    let { data, error } = await superBase.auth.signInWithPassword({
        email: loginUsername,
        password: loginPassword
    })

    if (error) {
        showMessage({
            message: error.message,
            type: 'danger',
        });
        return false;
    } else {
        return data;
    }
}