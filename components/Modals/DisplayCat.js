import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import Colors from '../constants/Colors';
import SmallText from './UI/SmallText';
import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';

const DisplayCat = (props) => {
    const renderCat = (itemData) => {
        return (
            <View style={styles.catContainer}>
                <TouchableNativeFeedback
                    onPress={() =>
                        props.navigation.navigate('Category', {
                            id: itemData.item,
                        })
                    }
                    background={TouchableNativeFeedback.Ripple(
                        Colors.brandColor,
                        true
                    )}
                >
                    <View style={styles.textContainer}>
                        <SmallText style={{ color: Colors.onBackgroundColor }}>
                            {
                                CATEGORIES.filter(
                                    (cat) => cat.id === itemData.item
                                )[0].name
                            }
                        </SmallText>
                    </View>
                </TouchableNativeFeedback>
            </View>
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
    catContainer: {
        flex: 0,
        borderRadius: 20,
        color: Colors.onBackgroundColor,
        margin: 5,
        fontSize: 14,
        height: 25,
    },
    textContainer: {
        flex: 0,
        borderWidth: 0.5,
        borderColor: Colors.onBackgroundSmallColor,
        paddingVertical: 2.5,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DisplayCat;
