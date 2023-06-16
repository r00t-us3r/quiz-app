import {StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Icon} from "@rneui/base";
import {DrawerActions} from "@react-navigation/native";
import {useEffect, useState} from "react";

import { useDrawerStatus } from '@react-navigation/drawer';
import {superBase} from "../../services/superBase";
import {dbSync} from "../../services/dbSync";
import DB from "../../realm/DB";
import {navigate} from "../../../App";
import Spinner from "react-native-loading-spinner-overlay";

export const SettingsScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Processing");
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (!loading) {
            setLoadingText("Processing");
        }
    }, [loading])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft: 18}} onPress={() => navigation.toggleDrawer()}>
                    <Icon name="bars" type="font-awesome" color="#00e4d4" style={{padding: 8}} />
                </TouchableOpacity>
            ),
        })

        superBase.auth.getUser().then((user) => {
            setCurrentUser(user.data);
        })
    }, [])

    const logout = () => {
        setLoadingText("Logging out");
        setLoading(true);
        setTimeout(() => {
            superBase.auth.signOut();
        }, 500)
    }

    const updateDb = async () => {
        setLoadingText("Updating Quiz Database");
        setLoading(true);

        DB.beginTransaction()
        DB.deleteAll();
        DB.commitTransaction();

        const loadRemoteQuizes = async () => {
            console.log('fetch remote quizes');
            const {data, error} = await superBase.from('quizes')
                .select('*');
            return data;
        }

        loadRemoteQuizes().then((resp) => {
            resp.forEach(quiz => {
                DB.write(() => {
                    DB.create("Quiz", {
                        id: quiz.id,
                        name: quiz.name,
                        description: quiz.description,
                        unlockCost: quiz.unlockCost,
                        unlocked: quiz.unlocked,
                        image: quiz.image,
                    })
                })
            });
            setTimeout(() => {
                setLoading(false);
                navigate("QuizList");
            }, 1000);
        })
    }

    return (
        <>
            <Spinner
                visible={loading}
                textContent={loadingText}
                textStyle={{color: 'white'}}
                overlayColor={'rgba(59,64,78,0.8)'}
            />
            <View style={styles.settingsContainer}>
                <>
                    <Text style={styles.settingsSectionTitle}>ACCOUNT</Text>
                    <View style={styles.settingsSectionContainer}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.disabled, styles.settingsItem]}>
                                <Icon name="envelope" type="font-awesome" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                                <View style={styles.settingsItemTextContainer}>
                                    <Text style={styles.settingsItemTitle}>Update Email Address</Text>
                                    <Text style={styles.settingsItemSubTitle}>{currentUser.user.email}</Text>
                                </View>
                                <View style={styles.settingsItemChevronContainer}>
                                    <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={[styles.disabled, styles.settingsItem]}>
                                <Icon name="key" type="font-awesome-5" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                                <View style={styles.settingsItemTextContainer}>
                                    <Text style={styles.settingsItemTitle}>Change Password</Text>
                                    <Text style={styles.settingsItemSubTitle}>Last changed 2 weeks ago</Text>
                                </View>
                                <View style={styles.settingsItemChevronContainer}>
                                    <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </>
                <>
                    <Text style={styles.settingsSectionTitle}>OTHER</Text>
                    <View style={styles.settingsSectionContainer}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.disabled, styles.settingsItem]}>
                                <Icon name="bell" type="font-awesome" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                                <View style={styles.settingsItemTextContainer}>
                                    <Text style={styles.settingsItemTitle}>Push Notifications</Text>
                                    <Text style={styles.settingsItemSubTitle}>For messages, Badges etc.</Text>
                                </View>
                                <View style={styles.settingsItemChevronContainer}>
                                    <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <View style={[styles.disabled, styles.settingsItem]}>
                                <Icon name="facebook" type="font-awesome-5" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                                <View style={styles.settingsItemTextContainer}>
                                    <Text style={styles.settingsItemTitle}>Connect Facebook Account</Text>
                                    <Text style={styles.settingsItemSubTitle}>Allows quick login & sharing</Text>
                                </View>
                                <View style={styles.settingsItemChevronContainer}>
                                    <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.settingsItem} onPress={updateDb}>
                            <Icon name="database" type="font-awesome-5" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                            <View style={styles.settingsItemTextContainer}>
                                <Text style={styles.settingsItemTitle}>Update Database</Text>
                                <Text style={styles.settingsItemSubTitle}>Current Version: 26-5-23</Text>
                            </View>
                            <View style={styles.settingsItemChevronContainer}>
                                <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            </View>
            <TouchableOpacity style={styles.settingsLogoutBtnContainer} onPress={logout}>
                <Text style={styles.settingsLogoutBtnText}>Log out</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    settingsContainer: {
        backgroundColor: '#3b404e',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        paddingHorizontal: 24
    },
    settingsSectionTitle: {
        color: '#9da0a9',
        fontWeight: 'bold',
        marginTop: 24
    },
    settingsSectionContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    settingsItem: {
        alignItems: 'center',
        backgroundColor: '#4f535d',
        borderRadius: 12,
        flexDirection: 'row',
        height: 80,
        marginVertical: 10,
        width: '100%'
    },
    disabled: {
        opacity: 0.3
    },
    settingsItemIcon: {
        borderColor: '#00e4d4',
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 12,
        padding: 12
    },
    settingsItemTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    settingsItemTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    settingsItemSubTitle: {
        color: '#95989e'
    },
    settingsItemChevronContainer: {
        flexGrow: 1,
        padding: 16
    },
    settingsItemChevronIcon: {
        alignSelf: 'flex-end'
    },
    settingsLogoutBtnContainer: {
        alignItems: 'center',
        backgroundColor: '#63697d',
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        width: '100%'
    },
    settingsLogoutBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    }
})