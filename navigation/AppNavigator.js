import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from '../screens/HomeScreen';
import QuestionScreen from '../screens/QuestionScreen';
import HotScreen from '../screens/HotScreen';
import NewScreen from '../screens/NewScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {

    const HomeStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Question' component={QuestionScreen} />
            </Stack.Navigator>
        )


    }


    return (
        <NavigationContainer>
            <Tab.Navigator
            activeColor={Colors.brandColor}
            inactiveColor={Colors.onSurfaceColor}
            barStyle={{ backgroundColor: Colors.surfaceColor }}
            shifting={false}
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused}) => {
                    let iconName;
                    let iconColor;

                    if(route.name === 'Home'){
                        iconName='home';
                        iconColor = focused ? Colors.brandColor : Colors.onSurfaceColor;
                    } else {
                        if(route.name === 'Hot') {
                            iconName='fire';
                            iconColor = focused ? Colors.brandColor : Colors.onSurfaceColor;
                        } else {
                            if(route.name === 'New') {
                                iconName='plus-circle';
                                iconColor = focused ? Colors.brandColor : Colors.onSurfaceColor;
                            } else {
                                if(route.name === 'Search') {
                                    iconName='magnify';
                                    iconColor = focused ? Colors.brandColor : Colors.onSurfaceColor;    
                                } else {
                                    if (route.name === 'Profile') {
                                        iconName='account';
                                        iconColor = focused ? Colors.brandColor : Colors.onSurfaceColor;
                                    }
                                    
                                }
                            }
                        }
                    }
                    return <Icon name={iconName} size={25} color={iconColor} />;
                }
            })}>
                <Tab.Screen name='Home' component={HomeStack} />
                <Tab.Screen name='Hot' component={HotScreen}/>
                <Tab.Screen name='New' component={NewScreen}/>
                <Tab.Screen name='Search' component={SearchScreen}/>
                <Tab.Screen name='Profile' component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;