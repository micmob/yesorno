import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CategoryScreen = props => {
    return(
        <View style={styles.center}>
            <Text>
                Category
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CategoryScreen;