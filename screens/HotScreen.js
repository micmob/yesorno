import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HotScreen = props => {

    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.backgroundColorGradient]} style={styles.container}>
            <View style={styles.insideContainer}>
                <QuestionList
                    navigation={props.navigation}
                    routeName='Hot'
                    backgroundColor={Colors.surfaceColor}
                />
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    insideContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    }
});

export default HotScreen;