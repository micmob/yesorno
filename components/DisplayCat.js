import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import Colors from '../constants/Colors';
import SmallText from './SmallText';
import { CATEGORIES } from '../data/dummy-data';

const DisplayCat = (props) => {
    const renderCat = (itemData) => {
        return (
            <Col>
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
                            <SmallText
                                style={{ color: Colors.onBackgroundColor }}
                            >
                                {
                                    CATEGORIES.filter(
                                        (cat) => cat.id === itemData.item
                                    )[0].name
                                }
                            </SmallText>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </Col>
        );
    };

    return (
        <Grid style={{ alignItems: 'center' }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.toString()}
                data={props.item}
                renderItem={renderCat}
                style={styles.list}
            />
        </Grid>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
    },
    catContainer: {
        borderRadius: 20,
        color: Colors.onBackgroundColor,
        margin: 5,
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: Colors.onBackgroundSmallColor,
        paddingVertical: 2.5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
});

export default DisplayCat;
