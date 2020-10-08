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
            >
                <Icon
                    name="home"
                    size={25}
                    color={
                        route.name === 'Home'
                            ? Colors.brandColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Hot')}
                type="medium"
                style={styles.iconContainer}
            >
                <Icon
                    name="fire"
                    size={25}
                    color={
                        route.name === 'Hot'
                            ? Colors.brandColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('New')}
                type="medium"
                style={styles.iconContainer}
            >
                <Icon
                    name="plus"
                    size={25}
                    color={
                        route.name === 'New'
                            ? Colors.brandColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Search')}
                type="medium"
                style={styles.iconContainer}
            >
                <Icon
                    name="magnify"
                    size={25}
                    color={
                        route.name === 'Search'
                            ? Colors.brandColor
                            : Colors.backgroundColor
                    }
                />
            </TouchMe>
            <TouchMe
                onPress={() => navigation.navigate('Profile')}
                type="medium"
                style={styles.iconContainer}
            >
                <Icon
                    name="account"
                    size={25}
                    color={
                        route.name === 'Account'
                            ? Colors.brandColor
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
    },
    iconContainer: {
        height: 55,
        width: 55,
    },
});

export default BottomNavigator;
