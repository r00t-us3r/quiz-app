import {Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";
import * as RootApp from "../../../App";

export const HeaderComponent = (item) => {
  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24}}>
        <Image source={require('../../../assets/icon.png')} style={{borderRadius: 50, height: 64, marginTop: 24, width: 64}} />
        <TouchableOpacity onPress={() => RootApp.closeDrawer()} style={{padding: 8}}>
          <Icon name="times" type="font-awesome" color="#00d7dc" />
        </TouchableOpacity>
      </View>
      <View style={{padding: 24}}>
        <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Hanna Fields</Text>
        <Text style={{color: '#9da0a6'}}>29,848 Coins</Text>
      </View>
    </>
  )
}
