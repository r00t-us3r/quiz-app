import {Animated, Button, Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {ExpandingDot} from "react-native-animated-pagination-dots";
import {useEffect, useRef, useState} from "react";

import swipe from '../../../assets/sounds/swipe.mp3'
import Sound from "react-native-sound";
import DB from "../../realm/DB";

export const QuizesScreen = ({navigation}) => {

    const images = {
        "a81ceac6-a8a1-4b53-ae31-2c3381c8c6a5": require("../../../assets/quizes/actors.svg"),
        "1ba2d6cc-eb1b-4ddc-ace2-e23e36c69480": require("../../../assets/quizes/sports.png"),
        "17654cd8-efe1-4945-abda-f44eea683d27": require("../../../assets/quizes/books.jpg"),
        "37c53bb5-65a0-407a-9ac8-fbecabda2e43": require("../../../assets/quizes/science.png"),
        "3283f3d8-b470-4158-8a15-8cc550a5112d": require("../../../assets/quizes/music.svg"),
        "1fb7ac80-fc22-4d26-9d81-faa468efd6c9": require("../../../assets/quizes/art.jpg"),
        "3fb42ee1-8f9a-4b37-a6cd-fef8f82897e5": require("../../../assets/quizes/movies.svg"),
        "a58ae097-c6f9-4f68-9c31-501074f4fd27": require("../../../assets/quizes/technology.jpg"),
        "4dfd8133-b83f-44d9-8164-cbd4d3781efe": require("../../../assets/quizes/animals.png"),
        "6e150e2c-66a6-474e-b600-516fe0c020d1": require("../../../assets/quizes/tv_shows.jpg")
    };

    const [quizes, setQuizes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getLocalQuizes = () => {
            return DB.objects('Quiz');
        }
        if (!isLoaded) {
            setIsLoaded(true);
            setQuizes(getLocalQuizes());
        }
    }, [quizes])

    const items = DB.objects("Quiz");

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const dimensions = {
      cardHeight: (screenHeight / 2) + (screenHeight / 4),
      cardWidth: screenWidth / 2 + (screenWidth / 3),
      marginHorizontal: (screenWidth - ((screenWidth / 2) + (screenWidth / 4))) / 3
    }

    const ListItem = ({item}) => {
        return (
            <View style={{backgroundColor: 'white', borderRadius: 8, display: 'flex', flexDirection: 'column', height: dimensions.cardHeight, marginHorizontal: dimensions.marginHorizontal, width: dimensions.cardWidth}}>
                <Image source={images[item.id]} style={{alignSelf: 'flex-start', borderTopLeftRadius: 8, borderTopRightRadius: 8, height: '50%', width: '100%'}} />
                <Text style={{color: '#2e313c', fontFamily: 'Rubik-Regular', fontSize: 36, paddingTop: 20, textAlign: 'center'}}>{item.name}</Text>
                <Text style={{color: '#2e313c', fontFamily: 'Rubik-Light', fontSize: 22, paddingBottom: 20, paddingHorizontal: 20, paddingTop: 10, textAlign: 'center'}}>{item.description}</Text>
                <TouchableOpacity style={{alignSelf: 'center', bottom: 24, position: 'absolute',marginHorizontal: '10%',width: '80%'}}>
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
                            padding: 12
                        }}
                    >
                        <Text style={{color: 'white', fontFamily: 'Rubik-Medium', fontSize: 24, textAlign: 'center'}}>Unlock Quiz</Text>
                        <Text style={{color: 'white', fontFamily: 'Rubik-Light', fontSize: 16, textAlign: 'center'}}>{item.unlockCost} Coins</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }


    const logo = {
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        width: 64,
        height: 64,
    };

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ alignItems: 'center', backgroundColor: '#3c4255', display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
            <Text style={{color: '#9d9fa4', fontSize: 16, marginTop: 24}}>Choose Your Path</Text>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                onScroll={
                    Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {
                            useNativeDriver: false
                        },
                    )
                }
                pagingEnabled
                horizontal
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={ListItem}
                snapToAlignment={'center'}
                centerContent={true}
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}} />
            <ExpandingDot
                data={items}
                expandingDotWidth={30}
                scrollX={scrollX}
                inActiveDotOpacity={0.6}
                dotStyle={{
                    // width: (Dimensions.get('window').width / items.length) / 2,
                    width: 5,
                    // height: (Dimensions.get('window').width / items.length) / 2,
                    height: 5,
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    marginHorizontal: 3
                }}
                containerStyle={{
                    bottom: 0,
                }}
            />
        </View>

        // <FlatList contentContainerStyle={{alignContent: 'center', alignItems: 'center', height: '100%'}} data={items} horizontal={true} initialNumToRender={1} renderItem={ListItem} />
    )
}
