import React from 'react';

import QuestionList from '../components/Question/QuestionList';
import Colors from '../constants/Colors';
import Container from '../components/Common/Container';
import BottomNavigator from '../components/Common/BottomNavigator';

const HomeScreen = props => {

    return (
        <Container>
            <QuestionList
                navigation={props.navigation}
                routeName="Home"
                backgroundColor={Colors.surfaceColor}
            />
            <BottomNavigator {...props} />
        </Container>
    );
};

export default HomeScreen;
