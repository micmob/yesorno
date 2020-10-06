import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import Colors from '../../constants/Colors';
import SmallText from '../UI/SmallText';
import { CATEGORIES } from '../../data/dummy-data';
import TouchMe from '../UI/TouchMe';

const DisplayCat = (props) => {
    const renderCat = (itemData) => {
        return (
            <TouchMe
                onPress={() =>
                    props.navigation.navigate('Category', {
                        id: itemData.item,
                    })
                }
                type='small'
            >
                <SmallText style={{ color: Colors.onBackgroundColor }}>
                    {
                        CATEGORIES.filter((cat) => cat.id === itemData.item)[0]
                            .name
                    }
                </SmallText>
            </TouchMe>
        );
    };

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.toString()}
            data={props.catId}
            renderItem={renderCat}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 0,
        flexDirection: 'row',
    },
});

export default DisplayCat;
