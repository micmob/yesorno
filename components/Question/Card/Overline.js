import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import SmallText from '../../UI/SmallText';
import RelativeTime from './RelativeTime';
import Colors from '../../../constants/Colors';
import { fetchUsers } from '../../../store/actions/auth';
import Firebase from '../../../config/Firebase';

const Overline = props => {
    const currentUserId = Firebase.auth().currentUser.uid;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const author = useSelector(state => state.auth.users).find(
        user => user.id === props.question.userId
    );

    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <View style={{flexDirection: 'row'}}>
                <SmallText>Posted by </SmallText>
                <SmallText style={{fontWeight: 'bold'}}>{author.username} </SmallText>
                <SmallText>~</SmallText>
                </View>
                <RelativeTime
                    current={new Date().getTime()}
                    previous={props.question.date}
                />
            </View>
            {props.routeName === 'QuestionScreen' && currentUserId === props.question.userId && (
                <View style={styles.actions}>
                    <View style={styles.actionsContainer}>
                        <TouchableNativeFeedback
                            onPress={props.onEditPress}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.touchColor
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

                    <View style={{ borderRadius: 100 }}>
                        <TouchableNativeFeedback
                            onPress={props.onDeletePress}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.touchColor,
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
