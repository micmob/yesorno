import React, { useState } from 'react';
import { View, StyleSheet, Modal, Button } from 'react-native';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';

const NewScreen = () => {

    return (
        <Modal>
            <View style={styles.container}>
                <View style={styles.insideContainer}>
                    <TitleText style={styles.title}>Type something..</TitleText>
                </View>
                <Button title='Post' />
                <Button title='Cancel' />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 400,
        borderRadius: 20,
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