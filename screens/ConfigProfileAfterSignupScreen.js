import React from 'react';
import { useDispatch } from 'react-redux';

import CustomizeProfile from '../components/Profile/CustomizeProfile';
import { editProfile, toggleIsAuth } from '../store/actions/auth';

const ConfigProfileAfterSignupScreen = props => {
    const dispatch = useDispatch();

    const handleButtonPress = (userId, username) => {
        dispatch(editProfile(userId, username)).then(() => {
            dispatch(toggleIsAuth(true));
        });
    };

    return (
        <CustomizeProfile
            onButtonPress={(userId, username) =>
                handleButtonPress(userId, username)
            }
            bottomButtonText=""
            onBottomButtonPress={() => {}}
            title="Let's add some info!"
        />
    );
};

export default ConfigProfileAfterSignupScreen;
