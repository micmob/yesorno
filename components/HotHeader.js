import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';

const HotHeader = () => {
    return(
        <View style={styles.container}>
            <TitleText style={styles.text}>Start</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 35,
        color: Colors.brandColor,
    }
});

export default HotHeader;