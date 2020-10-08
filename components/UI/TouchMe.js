import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors } from 'react-native-elements';
import Colors from '../../constants/Colors';

const TouchMe = props => {
    return (
        <View
            style={
                props.type === 'medium'
                    ? [styles.container, { borderRadius: 100 }, props.style]
                    : [styles.container, props.style]
            }
        >
            <TouchableNativeFeedback
                onPress={props.onPress}
                background={TouchableNativeFeedback.Ripple(
                    props.touchColor ? props.touchColor : Colors.brandColor,
                    true
                )}
            >
                <View
                    style={
                        props.type === 'medium'
                            ? [
                                  styles.insideTouchable,
                                  {
                                      paddingVertical: 10,
                                      paddingHorizontal: 10,
                                      borderRadius: 100,
                                  },
                                  props.insideTouchable
                              ]
                            : styles.insideTouchable
                    }
                >
                    {props.children}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: 20,
        color: Colors.onBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: Colors.surfaceColor,
    },
    insideTouchable: {
        flex: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2.5,
        paddingHorizontal: 10,
        width: '100%',
    },
});

export default TouchMe;
