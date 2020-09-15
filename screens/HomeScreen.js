import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import React from 'react';

import { QUESTIONS } from '../data/dummy-data'

import QuestionList from '../components/QuestionList';

const HomeScreen = props => {
    return (
        <QuestionList
            questions={QUESTIONS}
            navigation={props.navigation}
        />
    )
}


export default HomeScreen;