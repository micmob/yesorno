import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const TitleText = ({style, ...props}) => (
    <Text {...props} style={[styles.titleText, style]} />
)

const styles = StyleSheet.create({
    titleText: {
        color: Colors.onBackgroundColor,
        fontSize: 18,
    }
})

export default TitleText;