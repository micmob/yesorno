import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

const Container = (props) => {

    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.backgroundColorGradient]} style={styles.container}>
            <View style={[styles.insideContainer, props.style]}>
                {props.children}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    insideContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
});

export default Container;
