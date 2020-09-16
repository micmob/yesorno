import React from 'react';

import { QUESTIONS } from '../data/dummy-data'
import QuestionList from '../components/QuestionList';

const HomeScreen = props => {
    //let questions = QUESTIONS.map(item => (( ));
    //posts older than 3 days aren't displayed
    const three_days_ago = 3 * 24 * 60 * 60 * 1000;
    
    const questions =
        QUESTIONS
        .filter(item => new Date() - item.date < three_days_ago)
        .sort((a, b) => a.upvotes < b.upvotes);

    return (
        <QuestionList
            questions={questions}
            navigation={props.navigation}
            routeName='Home'
        />
    )
}


export default HomeScreen;