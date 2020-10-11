import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Authentication from '../components/Auth/Authentication';
import Firebase from '../config/Firebase';
import { autoLogIn, toggleIsAuth } from '../store/actions/auth';

const LoginScreen = (props) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const currentUser = Firebase.auth().currentUser;
        if(currentUser) {
            console.log(currentUser.email);
            dispatch(autoLogIn(currentUser.email)).then(() => {
                dispatch(toggleIsAuth(true));
            })
        }
    }, [])

    return (
        <Authentication title='LOG IN' action='Login' navigation={props.navigation} />
    );
};

export default LoginScreen;
