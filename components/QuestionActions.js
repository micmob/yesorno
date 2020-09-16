import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid, Col, Row } from 'react-native-easy-grid';
import SmallText from './SmallText';

const QuestionActions = props => {
    return(
        <Grid style={{alignSelf: 'flex-end', width: 60}}>
            <Row style={styles.actions}>
                <Col style={[styles.center, {alignItems: 'flex-end'}]}>
                    {
                        props.question.upvotes > 999 ?
                        <SmallText>{Math.round(props.question.upvotes/100) / 10}k</SmallText> //display one decimal + 'k'
                        :
                        <SmallText>{props.question.upvotes}</SmallText>
                    }
                </Col>
                <Col style={styles.center}>
                    <Icon name='arrow-up-bold-circle' color={Colors.onSurfaceColor} size={25} />
                </Col>
            </Row>
        </Grid>
    )
}

const styles = StyleSheet.create({
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
})

export default QuestionActions;