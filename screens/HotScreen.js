import React from 'react';

import QuestionList from '../components/Question/QuestionList';
import Colors from '../constants/Colors';
import Container from '../components/Common/Container';
import BottomNavigator from '../components/Common/BottomNavigator';

const HotScreen = props => {
    return (
        <Container>
            <QuestionList
                navigation={props.navigation}
                routeName="Hot"
                backgroundColor={Colors.surfaceColor}
            />
            <BottomNavigator {...props} />
        </Container>
    );
};

export default HotScreen;
