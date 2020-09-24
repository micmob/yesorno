import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HotScreen = props => {

    const [questions, setQuestions] = useState([]);

    const filteredQuestions = useSelector(
        (state) => state.questions.filteredQuestions
    );

    //yoinked from Reddit
    const now = new Date();
    useEffect(() => {
        setQuestions(filteredQuestions
            .sort((a, b) =>
                (Math.log10(a.upvotes) + (now - a.date) / 45000)
                <
                (Math.log10(b.upvotes) + (now - b.date) / 45000)));
    }, [filteredQuestions]);

    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.backgroundColorGradient]} style={styles.container}>
            <View style={styles.insideContainer}>
                <QuestionList
                    questions={questions}
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