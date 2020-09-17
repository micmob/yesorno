import React from 'react';
import { View, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import SmallText from './SmallText';
import { CATEGORIES } from '../data/dummy-data';
import { Grid, Col } from 'react-native-easy-grid';
import Colors from '../constants/Colors';

const DisplayCat = props => {

    const renderCat = itemData => {
        return (
            <Col>
                <TouchableWithoutFeedback>
                    <View style={styles.catContainer}>
                        <SmallText style={{ color: Colors.surfaceColor, fontWeight: 'bold' }}>
                            {CATEGORIES.filter(cat => cat.id === itemData.item)[0].title}
                        </SmallText>
                    </View>
                </TouchableWithoutFeedback>
            </Col>

        )
    }
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

    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
    },
    catContainer: {
        paddingHorizontal: 5,
        marginRight: 5,
        borderRadius: 20,
        backgroundColor: Colors.onSurfaceSmallColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DisplayCat;