import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const SmallText = ({style, ...props}) => (
    <Text {...props} style={[styles.smallText, style]} />
)

const styles = StyleSheet.create({
    smallText: {
        color: Colors.onSurfaceSmallColor,
        fontSize: 14,
    }
})

export default SmallText;