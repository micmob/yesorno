import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';
import { HELLO } from '../data/dummy-data';
import SmallText from './SmallText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Col, Row, Grid } from "react-native-easy-grid";

const HomeHeader = () => {

    const Stats = () => {
        return(
            <Grid>
                <Col style={{alignItems: 'flex-end'}}>
                    <Row style={styles.centerStats}>
                        <Icon name='pen' color={Colors.brandColor} size={25} />
                    </Row>
                    <Row style={[styles.centerStats, {marginTop: 5}]}>
                        <Icon name='arrow-up-bold-circle' color={Colors.brandColor} size={25} />
                    </Row>
                </Col>
                <Col>
                    <Row style={styles.centerStats}>
                        <SmallText style={styles.textStats}> 23</SmallText>
                    </Row>
                    <Row style={[styles.centerStats, {marginTop: 5}]}>
                        <SmallText style={styles.textStats}> 2211</SmallText>
                    </Row>
                </Col>
            </Grid>
        )
    }

    const SayHi = () => {
        let nr = Math.floor(Math.random() * Math.floor(HELLO.length));
        return(
            // <TitleText style={styles.text}>
            //     { HELLO[nr].name }
            // </TitleText>
            <TitleText style={styles.text}>
                How's it going?
            </TitleText>
        )
    }

    return(
        <Grid style={styles.container}>
            <Col style={[styles.center, {alignItems: 'center'}]}>
                <SayHi />
            </Col>
            <Col style={styles.center}>
                <Stats />
            </Col>
            
        </Grid>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'center',
    },
    center: {
        justifyContent: 'center',
    },
    centerStats: {
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: Colors.onBackgroundColor,
    },
    textStats: {
        color: Colors.onBackgroundColor,
        fontSize: 15,
        fontWeight: 'bold',
    },

});

export default HomeHeader;