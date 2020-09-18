import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid, Col, Row } from 'react-native-easy-grid';
import SmallText from './SmallText';

const QuestionActions = props => {

    const [upvoteButtonColor, setUpvoteButtonColor] = useState(Colors.onSurfaceColor)

    const changeUpvoteButtonColor = () => {
        if (upvoteButtonColor === Colors.onSurfaceColor) {
            setUpvoteButtonColor(Colors.brandColor);
        } else {
            setUpvoteButtonColor(Colors.onSurfaceColor);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={changeUpvoteButtonColor}>
            <Grid style={{ alignSelf: 'flex-end', width: 80 }}>
                <Row style={styles.actions}>
                    <Col style={[styles.center, { alignItems: 'flex-end' }]}>
                        {
                            props.question.upvotes > 999 ?
                                <SmallText>{Math.round(props.question.upvotes / 100) / 10}k</SmallText> //display one decimal + 'k'
                                :
                                <SmallText>{props.question.upvotes}</SmallText>
                        }
                    </Col>
                    <Col style={[styles.center, { paddingLeft: 2, alignSelf: 'flex-end' }]}>
                        <View>
                            <Icon name='arrow-up-bold-circle' color={upvoteButtonColor} size={30} />
                        </View>

                    </Col>
                </Row>

            </Grid>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
})

export default QuestionActions;