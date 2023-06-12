import {Button, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const QuizesScreen = ({navigation}) => {

    const items = [
        {
            title: 'test'
        },
        {
            title: 'test 1'
        },
        {
            title: 'test 2'
        },
        {
            title: 'test 3'
        },
        {
            title: 'test 4'
        },
    ];

    const ListItem = ({item}) => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 4, height: (Dimensions.get('window').height / 3), marginHorizontal: (Dimensions.get('window').width / 2) / 2, width: (Dimensions.get('window').width / 2)}}>
                <Image source={require('../../../assets/colored-pencils-guide-for-beginners-and-artists.jpg')} style={{alignSelf: 'flex-start', width: '100%', height: '60%'}} />
                <Text>{item.title}</Text>
                <LinearGradient
                    colors={['#00ebcf', '#00beec']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 1]}
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        borderRadius: 24,
                        justifyContent: 'flex-end',
                        padding: 12,
                        width: '80%'
                    }}
                >
                    <TouchableOpacity>
                        <Text>Unlock Quiz</Text>
                        <Text>250 Coins</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }


    const logo = {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        width: 64,
        height: 64,
    };

    return (
        <View style={{ alignItems: 'center', backgroundColor: '#3c4255', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            <Text style={{color: '#9d9fa4', fontSize: 16}}>Choose Your Path</Text>
            <ScrollView horizontal snapToInterval={Dimensions.get('window').width} snapToAlignment={'center'} decelerationRate={0} centerContent={true} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                <ListItem item={{title: 'test 1'}} />
                <ListItem item={{title: 'test 2'}} />
                <ListItem item={{title: 'test 3'}} />
                <ListItem item={{title: 'test 4'}} />
                <ListItem item={{title: 'test 5'}} />
                <ListItem item={{title: 'test 6'}} />
                <ListItem item={{title: 'test 7'}} />
                <ListItem item={{title: 'test 8'}} />
                <ListItem item={{title: 'test 9'}} />
                <ListItem item={{title: 'test 10'}} />
            </ScrollView>
        </View>

        // <FlatList contentContainerStyle={{alignContent: 'center', alignItems: 'center', height: '100%'}} data={items} horizontal={true} initialNumToRender={1} renderItem={ListItem} />
    )
}