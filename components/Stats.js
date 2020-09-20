import React from 'react';
import { StyleSheet } from 'react-native';
import SmallText from '../components/SmallText';
import Colors from '../constants/Colors';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stats = (props) => {
    return (
        <Col style={[styles.container, {borderRightWidth: props.borderWidth}]}>
            <Grid>
                <Col style={styles.center}>
                    <Icon
                        name={props.iconName}
                        color={Colors.brandColor}
                        size={30}
                    />
                </Col>
                <Col style={styles.left}>
                    <Row style={styles.center}>
                        <SmallText
                            style={[styles.textStats, styles.textStatsNumber]}
                        >
                            {props.value}
                        </SmallText>
                    </Row>
                    <Row style={styles.center}>
                        <SmallText style={styles.textStats}>
                            {props.text}
                        </SmallText>
                    </Row>
                </Col>
            </Grid>
        </Col>
    );
};

const styles = StyleSheet.create({
    left: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 0,
        paddingLeft: 10,
    },
    container: {
        flex: 0,
        borderRightColor: Colors.onSurfaceSmallColor,
        paddingHorizontal: 20,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        paddingVertical: 2,
    },
    textStats: {
        color: Colors.onBackgroundColor,
    },
    textStatsNumber: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Stats;
