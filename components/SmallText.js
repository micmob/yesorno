import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

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