import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HotScreen = props => {
    //yoinked from Reddit

    const now = new Date();
    const questions =
        useSelector(state => state.questions.filteredQuestions)
            .sort((a, b) =>
                (Math.log10(a.upvotes) + (now - a.date) / 45000)
                <
                (Math.log10(b.upvotes) + (now - b.date) / 45000));

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <QuestionList
                    questions={questions}
                    navigation={props.navigation}
                    routeName='Hot'
                    backgroundColor={Colors.surfaceColor}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    insideContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    }
});

export default HotScreen;