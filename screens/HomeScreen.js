import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HomeScreen = (props) => {

    const [questions, setQuestions] = useState([]);

    const filteredQuestions = useSelector(
        (state) => state.questions.filteredQuestions
    );

    useEffect(() => {
        setQuestions(filteredQuestions.sort((a, b) => a.upvotes < b.upvotes));
    }, [filteredQuestions]);
    
    return (
        <LinearGradient colors={[Colors.backgroundColor, Colors.backgroundColorGradient]} style={styles.container}>
            <View style={styles.insideContainer}>
                <QuestionList
                    questions={questions}
                    navigation={props.navigation}
                    routeName="Home"
                    backgroundColor={Colors.surfaceColor}
                />
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

export default HomeScreen;
