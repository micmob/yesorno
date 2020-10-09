import React from 'react';

import Authentication from '../components/Auth/Authentication';

const SignupScreen = (props) => {
    return (
        <Authentication title='SIGN UP' action='Signup' navigation={props.navigation} />
    );
};

export default SignupScreen;
