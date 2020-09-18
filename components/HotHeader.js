import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const HotHeader = () => {
    return(
        <View style={styles.container}>
            <Icon name='settings' color={Colors.onBackgroundColor} size={25} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 15,
    },
});

export default HotHeader;