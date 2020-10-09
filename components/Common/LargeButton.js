import React from 'react';
import { StyleSheet } from 'react-native';

import TouchMe from '../UI/TouchMe';
import TitleText from '../UI/TitleText';
import Colors from '../../constants/Colors';

const LargeButton = props => {
    return (
        <TouchMe
            type="small"
            onPress={props.onPress}
            style={[styles.touchMe, props.style]}
            touchColor={Colors.accentColor}
        >
            <TitleText style={styles.text}>{props.text}</TitleText>
        </TouchMe>
    );
};

const styles = StyleSheet.create({
    touchMe: {
        backgroundColor: Colors.brandColor,
        borderWidth: 0,
        height: 60,
        width: '100%',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.accentColor,
    },
});

export default LargeButton;
