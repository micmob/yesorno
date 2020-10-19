import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Authentication from '../components/Auth/Authentication';

const LoginScreen = (props) => {

    return (
        <Authentication title='LOG IN' action='Login' navigation={props.navigation} />
    );
};

export default LoginScreen;
