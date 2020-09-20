import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import { QUESTIONS } from '../data/dummy-data';
import QuestionList from '../components/QuestionList';
import Colors from '../constants/Colors';

const HotScreen = props => {

    const three_days_ago = 3 * 24 * 60 * 60 * 1000;

    //yoinked from Reddit

    const now = new Date();
    const questions =
        QUESTIONS
            .filter(item => now - item.date < three_days_ago)
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
                    textColor={Colors.onSurfaceColor}
                    smallTextColor={Colors.onSurfaceSmallColor}
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