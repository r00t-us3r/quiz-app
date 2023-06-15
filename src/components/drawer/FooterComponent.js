import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import * as RootApp from "../../../App";
import {DrawerActions} from "@react-navigation/native";
import {closeDrawer} from "../../../App";
import {superBase} from "../../services/superBase";

export const FooterComponent = ({navigation}) => {

  return (
    <View style={{borderTopWidth: 1, borderTopColor: '#50576d', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 8, paddingTop: 12}}>
      <TouchableOpacity style={{alignContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: '#50576d', flexDirection: 'row', flexGrow: 0.5, justifyContent: 'center'}} onPress={() => RootApp.navigate("Settings")}>
        <Icon name="cog" type="font-awesome" color="#777c8e" style={{padding: 8}} />
        <Text style={{color: '#777c8e', padding: 8}}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignContent: 'center', alignItems: 'center', borderLeftWidth: 0.5, borderLeftColor: '#50576d', flexDirection: 'row', flexGrow: 0.5, justifyContent: 'center'}} onPress={() => {
          RootApp.closeDrawer();
          superBase.auth.signOut()
      }}>
        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" color="#777c8e"/>
        {/*<Icon name="fa-right-from-bracket" type="font-awesome-5" color="#00d7dc" style={{padding: 8}} />*/}
        <Text style={{color: '#777c8e', padding: 8}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}
