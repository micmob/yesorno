import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

const TitleText = ({style, ...props}) => (
    <Text {...props} style={[styles.titleText, style]} />
)

const styles = StyleSheet.create({
    titleText: {
        color: Colors.onSurfaceColor,
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default TitleText;