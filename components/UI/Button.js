import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';
import TitleText from '../components/TitleText';

const Button = props => {
    let color = props.style;
    return (
        <View style={[styles.button, color]}>
            <TouchableNativeFeedback onPress={props.onButtonPress} background={TouchableNativeFeedback.Ripple(Colors.brandColor, true)}>
                <View style={styles.textHolder}>
                    <TitleText style={styles.text}>{props.text}</TitleText>
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
    text: {
        fontSize: 30,
        color: Colors.backgroundColor,
    },
    textHolder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Button;