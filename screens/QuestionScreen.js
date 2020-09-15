import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Colors from '../Constants/Colors';
import TitleText from '../components/TitleText'

import { SafeAreaView } from 'react-native-safe-area-context';
import Overline from '../components/Overline';

const QuestionScreen = props => {
    let question = props.route.params.question;

    const Button = props => {
        let color = props.style;
        console.log(styles.button);
        return (
            <View style={[styles.button, color]}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.onPressColor, true)}>
                    <View style={styles.answerHolder}>
                        <TitleText style={styles.answer}>{props.answer}</TitleText>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

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
    button: {
        width: 170,
        height: 70,
        borderRadius: 20,
    },
    answer: {
        fontSize: 30,
        color: Colors.backgroundColor,
    },
    answerHolder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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