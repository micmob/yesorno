import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loading = () => {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.brandColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;
