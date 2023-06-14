import {StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import {DrawerActions} from "@react-navigation/native";
import {useEffect, useState} from "react";

import { useDrawerStatus } from '@react-navigation/drawer';

export const SettingsScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft: 18}} onPress={() => navigation.toggleDrawer()}>
                    <Icon name="bars" type="font-awesome" color="#00e4d4" style={{padding: 8}} />
                </TouchableOpacity>
            ),
        })
    }, [])

    const logout = () => {
        dispatch(signOut());
    }

    return (
        <>
            <View style={styles.settingsContainer}>
                <>
                    <Text style={styles.settingsSectionTitle}>ACCOUNT</Text>
                    <View style={styles.settingsSectionContainer}>
                        <TouchableOpacity style={styles.settingsItem}>
                            <Icon name="envelope" type="font-awesome" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                            <View style={styles.settingsItemTextContainer}>
                                <Text style={styles.settingsItemTitle}>Update Email Address</Text>
                                <Text style={styles.settingsItemSubTitle}>hannafields@email.com</Text>
                            </View>
                            <View style={styles.settingsItemChevronContainer}>
                                <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingsItem}>
                            <Icon name="key" type="font-awesome-5" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                            <View style={styles.settingsItemTextContainer}>
                                <Text style={styles.settingsItemTitle}>Change Password</Text>
                                <Text style={styles.settingsItemSubTitle}>Last changed 2 weeks ago</Text>
                            </View>
                            <View style={styles.settingsItemChevronContainer}>
                                <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
                <>
                    <Text style={styles.settingsSectionTitle}>OTHER</Text>
                    <View style={styles.settingsSectionContainer}>
                        <TouchableOpacity style={styles.settingsItem}>
                            <Icon name="bell" type="font-awesome" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                            <View style={styles.settingsItemTextContainer}>
                                <Text style={styles.settingsItemTitle}>Push Notifications</Text>
                                <Text style={styles.settingsItemSubTitle}>For messages, Badges etc.</Text>
                            </View>
                            <View style={styles.settingsItemChevronContainer}>
                                <Icon name="chevron-right" type="font-awesome" color="#00e4d4" style={styles.settingsItemChevronIcon} size={12} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingsItem}>
                            <Icon name="facebook" type="font-awesome-5" color="#00e4d4" style={styles.settingsItemIcon} size={24} />
                            <View style={styles.settingsItemTextContainer}>
                                <Text style={styles.settingsItemTitle}>Connect Facebook Account</Text>
                                <Text style={styles.settingsItemSubTitle}>Allows quick login & sharing</Text>
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