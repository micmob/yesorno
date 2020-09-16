import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';

const Button = props => {
    let color = props.style;
    console.log(styles.button);
    return (
        <View style={[styles.button, color]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.onPressColor, true)}>
                <View style={styles.answerHolder}>
                    <TitleText style={styles.answer}>{props.answer}</TitleText>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 170,
        height: 70,
        borderRadius: 20,
    },
    answer: {
        fontSize: 30,
        color: Colors.backgroundColor,
    },
    answerHolder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Button;