import React from 'react';

import Form from '../components/Auth/Form';

const SignupScreen = (props) => {
    return (
        <Form title='SIGN UP' action='Signup' navigation={props.navigation} />
    );
};

export default SignupScreen;
