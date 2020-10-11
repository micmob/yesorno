import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TouchMe from '../UI/TouchMe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigator = props => {
    const route = props.route;
    const navigation = props.navigation;

    return (
        <View style={styles.container}>
            <TouchMe
                onPress={() => navigation.navigate('Home')}
                type="medium"
                style={styles.iconContainer}
                touchColor = {Colors.surfaceColor}
            >
                <Icon
                    name="home"
                    size={25}
                    color={
                        route.name === 'Home'
                            ? Colors.surfaceColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Hot')}
                type="medium"
                style={styles.iconContainer}
                touchColor = {Colors.surfaceColor}
            >
                <Icon
                    name="fire"
                    size={25}
                    color={
                        route.name === 'Hot'
                            ? Colors.surfaceColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('New')}
                type="medium"
                style={styles.iconContainer}
                touchColor = {Colors.surfaceColor}
            >
                <Icon
                    name="plus"
                    size={25}
                    color={
                        route.name === 'New'
                            ? Colors.surfaceColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Search')}
                type="medium"
                style={styles.iconContainer}
                touchColor = {Colors.surfaceColor}
            >
                <Icon
                    name="magnify"
                    size={25}
                    color={
                        route.name === 'Search'
                            ? Colors.surfaceColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Profile')}
                type="medium"
                style={styles.iconContainer}
                touchColor = {Colors.surfaceColor}
            >
                <Icon
                    name="account"
                    size={25}
                    color={
                        route.name === 'Profile'
                            ? Colors.surfaceColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    iconContainer: {
        height: 55,
        width: 55,
        backgroundColor: Colors.brandColor
    },
});

export default BottomNavigator;
