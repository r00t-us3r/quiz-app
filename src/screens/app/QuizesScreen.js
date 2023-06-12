import {Button, Text, View} from "react-native";

export const QuizesScreen = ({navigation}) => {
    return (
        <View style={{ alignItems: 'center', backgroundColor: '#3c4255', flex: 1, justifyContent: 'center' }}>
            <Text>{JSON.stringify(navigation)}</Text>
            <Button onPress={() => navigation.openDrawer()} title="open launcher" />
        </View>
    )
}