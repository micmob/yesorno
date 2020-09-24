import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HomeScreen = (props) => {
    const questions = useSelector(
        (state) => state.questions.filteredQuestions
    ).sort((a, b) => a.upvotes < b.upvotes);

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <QuestionList
                    questions={questions}
                    navigation={props.navigation}
                    routeName="Home"
                    backgroundColor={Colors.surfaceColor}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    insideContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
});

export default HomeScreen;
