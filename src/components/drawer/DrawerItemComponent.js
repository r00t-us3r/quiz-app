import {Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { useRoute } from '@react-navigation/native';
import {useEffect} from "react";
import {navigate} from "../../../App";

export const DrawerItemComponent = ({item}) => {
    return ((item.active) ? (
            <TouchableOpacity style={{alignContent: 'center', alignItems: 'center', backgroundColor: '#333845', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 12}} onPress={() => navigate(item.slug, {})}>
                <FontAwesomeIcon icon={item.icon} color="#ffffff" style={{alignContent: 'flex-end', alignItems: 'flex-end', width: '20%'}} size={18}/>
                <Text style={{alignContent: 'flex-start', alignItems: 'flex-start', color: '#ffffff', fontSize: 18, paddingLeft: 16, width: '80%'}}>{item.title}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={{alignContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 12}} onPress={() => navigate(item.slug, {})}>
                <FontAwesomeIcon icon={item.icon} color="#ffffff" style={{alignContent: 'flex-end', alignItems: 'flex-end', width: '20%'}} size={18}/>
                <Text style={{alignContent: 'flex-start', alignItems: 'flex-start', color: '#ffffff', fontSize: 18, paddingLeft: 16, width: '80%'}}>{item.title}</Text>
            </TouchableOpacity>
        )
    )
}