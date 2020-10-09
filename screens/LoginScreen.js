import React from 'react';

import Authentication from '../components/Auth/Authentication';

const LoginScreen = (props) => {
    return (
        <Authentication title='LOG IN' action='Login' navigation={props.navigation} />
    );
};

export default LoginScreen;
