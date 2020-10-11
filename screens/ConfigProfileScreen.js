import React from 'react';
import { useDispatch } from 'react-redux';

import CustomizeProfile from '../components/Profile/CustomizeProfile';
import { editProfile } from '../store/actions/auth';

const ConfigProfileScreen = props => {

    const dispatch = useDispatch();

    const handleBottomButtonPress = () => {
        props.navigation.goBack();
    };

    const handleButtonPress = (userId, username) => {
        dispatch(editProfile(userId, username)).then(() => {
            props.navigation.navigate('Profile');
        });
    };

    return (
        <CustomizeProfile
            onButtonPress={(userId, username) =>
                handleButtonPress(userId, username)
            }
            bottomButtonText="GO BACK."
            onBottomButtonPress={handleBottomButtonPress}
            title="Edit your profile."
        /> //send placeholder for username + picture
    );
};

export default ConfigProfileScreen;
