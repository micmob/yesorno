import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import HotScreen from '../screens/HotScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors';
import { filterQuestions } from '../store/actions/questions';
import { FILTER } from '../constants/Filters';
import { fetchQuestions } from '../store/actions/questions';
import NewScreen from '../screens/NewScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AppNavigator = props => {
    const [isAuth, setIsAuth] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
        );
    };

    const AppStack = () => {
        return (
            <Stack.Navigator
                headerMode={false}
                screenOptions={{ animationEnabled: false }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(filterQuestions(FILTER.LAST_WEEK));
                            navigation.navigate('Home');
                        },
                    })}
                />
                <Stack.Screen
                    name="Hot"
                    component={HotScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(filterQuestions(FILTER.LAST_24_HOURS));
                            navigation.navigate('Hot');
                        },
                    })}
                />
                <Stack.Screen name="New" component={NewScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            {isAuth ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    menuIcon: {
        flex: 0,
        backgroundColor: Colors.surfaceColor,
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default AppNavigator;
