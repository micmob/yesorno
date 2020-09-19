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