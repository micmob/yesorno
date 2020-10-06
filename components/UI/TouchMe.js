import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';

const TouchMe = (props) => {
    return (
        <View
            style={
                props.type === 'medium'
                    ? {
                          ...styles.container,

                          borderRadius: 100,
                      }
                    : [
                          styles.container,
                          {
                              borderWidth: 0.5,
                              borderColor: Colors.onBackgroundSmallColor,
                          },
                      ]
            }
        >
            <TouchableNativeFeedback
                onPress={props.onPress}
                background={TouchableNativeFeedback.Ripple(
                    Colors.brandColor,
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
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideTouchable: {
        flex: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2.5,
        paddingHorizontal: 10,
    },
});

export default TouchMe;
