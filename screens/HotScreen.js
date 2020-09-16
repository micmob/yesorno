import React from 'react';
import { StyleSheet } from 'react-native';

import { QUESTIONS } from '../data/dummy-data'
import QuestionList from '../components/QuestionList'

const HotScreen = props => {

    const three_days_ago = 3 * 24 * 60 * 60 * 1000;

    //yoinked from Reddit

    const now = new Date();
    const questions =
        QUESTIONS
        .filter(item => now - item.date < three_days_ago)
        .sort((a, b) =>
                (Math.log10(a.upvotes) + (now - a.date)/45000)
                >
                (Math.log10(b.upvotes) + (now - b.date)/45000));

    return (
        <QuestionList
            questions={questions}
            navigation={props.navigation}
            routeName='Hot'
        />
    )
}

const styles = StyleSheet.create({

});

export default HotScreen;