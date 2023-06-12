// import {Button, Text, View} from "react-native";

// export const QuizesScreen = ({navigation}) => {
//     return (
        // <View style={{ alignItems: 'center', backgroundColor: '#3c4255', flex: 1, justifyContent: 'center' }}>
        //     <Text>{JSON.stringify(navigation)}</Text>
        //     <Button onPress={() => navigation.openDrawer()} title="open launcher" />
        // </View>
    // )
// }




import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    Easing,
    withSpring,
    withTiming,
    withSequence
} from 'react-native-reanimated';

import PlayerBadge from '../../components/PlayerBadge';
import Button from '../../components/Button';


import {initDeck} from "../../util/card-supplier";

const {width, height} = Dimensions.get('screen');

export const QuizesScreen = () => {

    const [players, setPlayers] = useState([
        {name: '', id: 1},
        {name: '', id: 2},
    ]);
    const [inGame, setInGame] = useState(false);
    const [deck, setDeck] = useState(() => initDeck());
    const [currCardIndex, setCurrCardIndex] = useState(0);


    const addPlayerButtonScale = useSharedValue(1);
    const startButtonScale = useSharedValue(1);
    const screenSlide = useSharedValue(height);
    //Resets addPlayerButtonScale whenever players changes (removing players).
    //Without this the button animates when removing players too
    useEffect(() => {
        addPlayerButtonScale.value = 1;
        startButtonScale.value = 1;
        screenSlide.value = 1;
    }, [players]);
    const addPlayerButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSequence(
                        withTiming(addPlayerButtonScale.value, {
                            duration: 100,
                            easing: Easing.bezier(0.5, 0.01, 0, 1),
                        }),
                        withTiming(1, {
                            duration: 100,
                            easing: Easing.bezier(0.5, 0.01, 0, 1),
                        }),
                    ),
                },
            ],
        };
    });
    const startButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSequence(
                        withTiming(startButtonScale.value, {
                            duration: 100,
                            easing: Easing.bezier(0.5, 0.01, 0, 1),
                        }),
                        withTiming(1, {
                            duration: 100,
                            easing: Easing.bezier(0.5, 0.01, 0, 1),
                        }),
                    ),
                },
            ],
        };
    });
    const scaledScreenAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(screenSlide.value, {
                        damping: 20,
                    }),
                },
            ],
        };
    });

    const playerBadges = players.map((player) => (
        <PlayerBadge
            playerName={player.name}
            players={players}
            setPlayers={setPlayers}
            id={player.id}
            key={player.id}
        />
    ));

    const playerListRef = useRef();

    return (
        <Animated.View
            style={[
                scaledScreenAnimation,
                styles.container,
            ]}>
            <View style={styles.playersContainer}>
                <ScrollView
                    ref={playerListRef}
                    overScrollMode={'never'}
                    showsVerticalScrollIndicator={false}>
                    {playerBadges}
                </ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    text={'Add a Player'}
                    onPress={() => {
                        setPlayers([
                            ...players,
                            {
                                name: '',
                                id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
                            },
                        ]);
                        addPlayerButtonScale.value = 0.9;
                        setTimeout(() => {
                            playerListRef.current.scrollToEnd({animated: true});
                        }, 100);
                    }}
                    style={addPlayerButtonAnimation}
                />
                <Button
                    text={players.length == 0 ? 'Play Without Players' : 'Play!'}
                    onPress={() => {
                        startButtonScale.value = 0.9;
                        setTimeout(() => {
                            screenSlide.value = height;
                            setTimeout(() => setInGame(true), 300);
                        }, 200);
                    }}
                    style={startButtonAnimation}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    titleContainer: {
        backgroundColor: '#303030',
        padding: 10,
        width: width,
        marginTop: height / 20,
        elevation: 10,
    },
    title: {
        color: '#FDD451',
        fontSize: height / 12,
        textAlign: 'center',
        fontFamily: 'FjallaOne',
    },
    playersContainer: {
        height: height / 2.5,
        // marginBottom: height / 50,
    },
    buttonsContainer: {
        height: height / 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});