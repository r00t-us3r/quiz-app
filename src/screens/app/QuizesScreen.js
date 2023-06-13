import {Button, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const QuizesScreen = ({navigation}) => {

    const items = [
        {
            title: 'Art & Design',
            description: 'Fusce vehicula dolor arcu, sit amet blandit dolor'
        },
        {
            title: 'Science',
            description: 'Lorem ipsum dolor sit amet.'
        },
        {
            title: 'Sports',
            description: 'Lorem ipsum dolor sit amet.'
        },
        {
            title: 'Technology',
            description: 'Lorem ipsum dolor sit amet.'
        },
        {
            title: 'Media Studies',
            description: 'Lorem ipsum dolor sit amet.'
        },
    ];

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const dimensions = {
      cardHeight: (screenHeight / 2) + (screenHeight / 4),
      cardWidth: screenWidth / 2 + (screenWidth / 3),
      marginHorizontal: (screenWidth - ((screenWidth / 2) + (screenWidth / 4))) / 3
    }
    console.log('===========');
    console.log('dimensions');
    console.log('===========');
    console.log('screen height: ' + screenHeight);
    console.log('card height: ' + dimensions.cardHeight);
    console.log('screen width: ' + screenWidth);
    console.log('card width: ' + dimensions.cardWidth);
    console.log('total card margin: ' + dimensions.marginHorizontal*2)

    const ListItem = ({item}) => {
        return (
            <View style={{backgroundColor: 'white', borderRadius: 8, height: dimensions.cardHeight, marginHorizontal: dimensions.marginHorizontal, width: dimensions.cardWidth}}>
                <Image source={require('../../../assets/colored-pencils-guide-for-beginners-and-artists.jpg')} style={{alignSelf: 'flex-start', borderTopLeftRadius: 8, borderTopRightRadius: 8, height: '50%', width: '100%'}} />
                <Text style={{color: '#2e313c', fontFamily: 'Rubik-Regular', fontSize: 36, paddingTop: 20, textAlign: 'center'}}>{item.title}</Text>
                <Text style={{color: '#2e313c', fontFamily: 'Rubik-Light', fontSize: 22, paddingBottom: 20, paddingHorizontal: 20, paddingTop: 10, textAlign: 'center'}}>{item.description}</Text>
                <LinearGradient
                    colors={['#00ebcf', '#00beec']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 1]}
                    style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        marginHorizontal: '10%',
                        padding: 12,
                        width: '80%'
                    }}
                >
                    <TouchableOpacity style={{alignContent: 'center', display: 'flex', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 24, textAlign: 'center'}}>Unlock Quiz</Text>
                        <Text style={{color: 'white', fontFamily: 'Rubik-Light', fontSize: 16, textAlign: 'center'}}>250 Coins</Text>
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
            <FlatList
              horizontal
              pagingEnabled={false}
              snapToInterval={screenWidth}
              snapToAlignment={'center'}
              decelerationRate={0}
              centerContent={true}
              contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
              data={items}
              renderItem={ListItem} />
        </View>

        // <FlatList contentContainerStyle={{alignContent: 'center', alignItems: 'center', height: '100%'}} data={items} horizontal={true} initialNumToRender={1} renderItem={ListItem} />
    )
}
