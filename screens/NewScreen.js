import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const NewScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.insideContainer}>
                <TitleText style={styles.title}>Type something..</TitleText>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.onBackgroundColor,
        marginBottom: 70,
        marginTop: 20,
    },
    insideContainer: {
        padding: 20,
    },
});

export default NewScreen;