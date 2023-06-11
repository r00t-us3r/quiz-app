import {Button, Text, View} from "react-native";

export const QuizesScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Text>Quizes Screen</Text>
            <Button onPress={() => navigation.openDrawer()} title="open launcher" />
        </View>
    )
}