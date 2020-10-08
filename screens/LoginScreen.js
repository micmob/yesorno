import React from 'react';

import Form from '../components/Auth/Form';

const LoginScreen = (props) => {
    return (
        <Form title='LOG IN' action='Login' navigation={props.navigation} />
    );
};

export default LoginScreen;
