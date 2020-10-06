import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import SmallText from '../../UI/SmallText';
import RelativeTime from './RelativeTime';
import Colors from '../../../constants/Colors';

const Overline = (props) => {
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
                            onPress={props.onEditPress}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.brandColor
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

                    <View style={{borderRadius: 100}}>
                        <TouchableNativeFeedback
                            onPress={props.onDeletePress}
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
        borderRadius: 20,
    },
    iconContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flex: 0,
    },
});

export default Overline;
