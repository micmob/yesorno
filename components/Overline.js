import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Trash from 'react-native-vector-icons/FontAwesome';

import SmallText from './SmallText';
import RelativeTime from './RelativeTime';
import Colors from '../constants/Colors';

const Overline = (props) => {
    console.log(props.routeName);
    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <SmallText>Posted by user ~</SmallText>
                <RelativeTime
                    current={new Date().getTime()}
                    previous={props.question.date}
                />
            </View>
            {props.routeName === 'QuestionScreen' && (
                <View style={styles.actions}>
                    <View style={styles.actionsContainer}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                console.log('boop');
                            }}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.brandColor,
                                true
                            )}
                        >
                            <View style={styles.iconContainer}>
                                <Icon
                                    name="edit"
                                    size={20}
                                    color={Colors.onBackgroundSmallColor}
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableNativeFeedback
                            onPress={() => {
                                console.log('boop');
                            }}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.brandColor,
                                true
                            )}
                        >
                            <View style={styles.iconContainer}>
                                <Icon
                                    name="trash"
                                    size={20}
                                    color={Colors.onBackgroundSmallColor}
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    actionsContainer: {
        borderRadius: 100,
    },
    iconContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
    },
});

export default Overline;
