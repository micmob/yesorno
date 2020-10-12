import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import HotScreen from '../screens/HotScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { filterQuestions } from '../store/actions/questions';
import { FILTER } from '../constants/Filters';
import { fetchQuestions } from '../store/actions/questions';
import { fetchUsers } from '../store/actions/auth';
import NewScreen from '../screens/NewScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ConfigProfileAfterSignupScreen from '../screens/ConfigProfileAfterSignupScreen';
import ConfigProfileScreen from '../screens/ConfigProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const isAuth = useSelector(state => state.auth.isAuth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers('appnav')).then(() => {
            dispatch(fetchQuestions());
        })
    }, [dispatch]);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen
                    name="ConfigProfileAfterSignup"
                    component={ConfigProfileAfterSignupScreen}
                />
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
                            dispatch(fetchUsers('appnav home')).then(() => {
                                dispatch(filterQuestions(FILTER.LAST_WEEK));
                            });
                            navigation.navigate('Home');
                        },
                    })}
                />
                <Stack.Screen
                    name="Hot"
                    component={HotScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(fetchUsers('appnav hot')).then(() => {
                                dispatch(filterQuestions(FILTER.LAST_24_HOURS));
                            });
                            navigation.navigate('Hot');
                        },
                    })}
                />
                <Stack.Screen name="New" component={NewScreen} />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(fetchUsers('appnav search'));
                            navigation.navigate('Search');
                        },
                    })}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(fetchUsers('appnav profile'));

                            navigation.navigate('Profile');
                        },
                    })}
                />
                <Stack.Screen name="Question" component={QuestionScreen} />
                <Stack.Screen
                    name="ConfigProfile"
                    component={ConfigProfileScreen}
                />
                <Stack.Screen
                    name="Category"
                    component={CategoryScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            dispatch(fetchUsers('appnav cat'));
                            navigation.navigate('Category');
                        },
                    })}
                />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            {isAuth ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
