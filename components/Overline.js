import React from 'react';
import SmallText from './SmallText';
import RelativeTime from './RelativeTime';
import { View, StyleSheet } from 'react-native';

const Overline = props => {
    return (
        <View style={styles.details}>
            <SmallText>Posted by user ~</SmallText>
            <RelativeTime current={new Date()} previous={props.question.date} />
        </View>
    )
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Overline;