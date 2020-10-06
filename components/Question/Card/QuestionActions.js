import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../../constants/Colors';
import SmallText from '../../UI/SmallText';
import { toggleUpvote, fetchQuestions } from '../../../store/actions/questions';

const QuestionActions = props => {
    const [upvoteButtonColor, setUpvoteButtonColor] = useState(
        Colors.onBackgroundColor
    );
    const [isUpvoted, setIsUpvoted] = useState(false); //TODO modify here when adding users

    const dispatch = useDispatch();

    const question = useSelector(state => state.questions.allQuestions).find(
        ques => ques.id === props.id
    );

    const UpvoteCount = () => (
        <Col style={[styles.center, { alignItems: 'flex-end' }]}>
            {question.upvotes > 999 ? (
                <SmallText>
                    {Math.round(question.upvotes / 100) / 10}k
                </SmallText> //display one decimal + 'k'
            ) : (
                <SmallText>{question.upvotes}</SmallText>
            )}
        </Col>
    );

    const UpvoteIcon = () => (
        <Col style={[styles.center, { paddingLeft: 2, alignSelf: 'flex-end' }]}>
            <View>
                <Icon
                    name="arrow-up-bold-circle"
                    color={upvoteButtonColor}
                    size={30}
                />
            </View>
        </Col>
    );

    const handleOnUpvotePress = async () => { //TODO fix this, upvotes and UI should be synched
        if (isUpvoted) {
            setUpvoteButtonColor(Colors.brandColor);
            question.upvotes++;
        } else {
            setUpvoteButtonColor(Colors.onBackgroundColor);
            question.upvotes++; //TODO change to -- after implementing users
        }
        setIsUpvoted(!isUpvoted);
        dispatch(toggleUpvote(question.id))
        
    };

    return (
        <TouchableWithoutFeedback onPress={handleOnUpvotePress}>
            <Grid style={styles.container}>
                <Row style={styles.actions}>
                    <UpvoteCount />
                    <UpvoteIcon />
                </Row>
            </Grid>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        width: 80,
    },
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});

export default QuestionActions;
