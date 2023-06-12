import {FlatList, Image, Text, View} from "react-native";
import {Icon} from "@rneui/base";
import {DrawerItemComponent} from "./DrawerItemComponent";
import {getRouteName} from "../../../App";

export const DrawerItemsComponent = () => {
    const route = getRouteName()

    const drawerItems = [
        {
            icon: 'fa-solid fa-list',
            slug: 'QuizList',
            title: 'Quizes',
            active: (route === 'QuizList')
        },
        {
            icon: 'fa-solid fa-comment',
            slug: 'ChatList',
            title: 'My Chats',
            active: (route === 'ChatList')
        },
        {
            icon: 'fa-solid fa-star',
            slug: 'Leaderboard',
            title: 'Leaderboard',
            active: (route === 'Leaderboard')
        },
        {
            icon: 'fa-solid fa-bell',
            slug: 'Notifications',
            title: 'Notifications',
            active: (route === 'Notifications')
        },
        {
            icon: 'fa-solid fa-dollar-sign',
            slug: 'EarnCoins',
            title: 'Earn Coins',
            active: (route === 'EarnCoins')
        },
    ]

    console.log(route);
    // return (
    //     <>
    //         <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24}}>
    //             <Image source={require('../../../assets/icon.png')} style={{borderRadius: 50, height: 64, marginTop: 24, width: 64}} />
    //             <Icon name="times" type="font-awesome" color="#00d7dc" style={{padding: 8}} />
    //         </View>
    //         <View style={{padding: 24}}>
    //             <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Hanna Fields</Text>
    //             <Text style={{color: '#9da0a6'}}>29,848 Coins</Text>
    //         </View>
    //     </>
    // )

    return (
        <FlatList
            data={drawerItems}
            renderItem={DrawerItemComponent}
            />
    )
}
