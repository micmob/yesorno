import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Colors from '../constants/Colors';
import TitleText from '../components/TitleText'

import { SafeAreaView } from 'react-native-safe-area-context';
import Overline from '../components/Overline';
import Button from '../components/Button';

const QuestionScreen = props => {
    let question = props.route.params.question;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.insideContainer}>
                <View style={styles.overline}>
                    <Overline question={question} />
                </View>
                <TitleText style={styles.title}>{question.title}</TitleText>
                <View style={styles.buttonsHolder}>
                    <Button answer='NO' style={styles.negative}/>
                    <Button answer='YES' style={styles.positive} />
                </View>
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
    buttonsHolder: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        width: '100%',
    },  
    overline: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    insideContainer: {
        padding: 20,
    },
    negative: {
        backgroundColor: Colors.negativeColor,
    },
    positive: {
        backgroundColor: Colors.positiveColor,
    }
});

export default QuestionScreen;