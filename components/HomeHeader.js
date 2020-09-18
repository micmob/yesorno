import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';
import { HELLO } from '../data/dummy-data';
import SmallText from './SmallText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingsIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Col, Row, Grid } from "react-native-easy-grid";

const HomeHeader = () => {

    // const SayHi = () => {
    //     let nr = Math.floor(Math.random() * Math.floor(HELLO.length));
    //     return(
    //         // <TitleText style={styles.text}>
    //         //     { HELLO[nr].name }
    //         // </TitleText>
    //         <TitleText style={styles.text}>
    //             How's it going?
    //         </TitleText>
    //     )
    // }

    // return(
    //     <Grid style={styles.container}>
    //         <Col style={[styles.center, {alignItems: 'center'}]}>
    //             <SayHi />
    //         </Col>
    //         <Col style={styles.center}>
    //             <View style={styles.settingsContainer}>
    //                 <SettingsIcon name='settings' color={Colors.onBackgroundColor} size={25} />
    //             </View>
    //         </Col>
            
    //     </Grid>
    // )
    return(
        <View style={styles.settingsContainer}>
            <SettingsIcon name='settings' color={Colors.onBackgroundColor} size={25} />
        </View>
    )
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 15,
    }
});

export default HomeHeader;