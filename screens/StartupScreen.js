import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../components/UI/Loading';
import { useDispatch } from 'react-redux';
import { autoLogIn, fetchUsers } from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const tryLogin = async () => {
            await dispatch(fetchUsers());
            const userData = await AsyncStorage.getItem('@userData');
            if (!userData) {
                props.navigation.navigate('Login');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, refreshToken, userId, expirationDate } = transformedData;
    
            const currentExpirationDate = new Date(expirationDate);
    
            if(currentExpirationDate <= new Date() || !token || !refreshToken || !userId) {
                props.navigation.navigate('Login');
                return;
            }

            const expiresIn = currentExpirationDate.getTime() - new Date().getTime();

            dispatch(autoLogIn(userId, token, refreshToken, expiresIn));
        };
        tryLogin();
    }, []);

    return <Loading />;
};

export default StartupScreen;
