import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Form from '../components/Auth/Form';
import ProfileImage from '../components/Profile/ProfileImage';
import DefaultTextInput from '../components/UI/DefaultTextInput';
import Loading from '../components/UI/Loading';
import Colors from '../constants/Colors';
import { toggleIsAuth } from '../store/actions/auth';

const EditProfileScreen = props => {
    const [username, setUsername] = useState();
    const initialProfileSetup = props.route.params.initialProfileSetup;
    const email = props.route.params.email;
    const password = props.route.params.password;
    const [isLoading, setIsLoading] = useState();
    console.log(email, password);

    const dispatch = useDispatch();

    const goBack = () => {
        props.navigation.goBack();
        //reset profile pic here
        setUsername(null);
    };

    const handleButtonPress = () => {
        try {
            dispatch(toggleIsAuth(true));
        } catch (error) {
            //setIsLoading(false);
            alert(error.message);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Form
            onButtonPress={handleButtonPress}
            buttonText="Finish"
            bottomButtonText={initialProfileSetup ? '' : 'GO BACK.'}
            onBottomButtonPress={goBack}
            title="EDIT YOUR PROFILE"
            navigation={props.navigation}
            {...props}
        >
            <View style={styles.container}>
                <ProfileImage image="https://reactjs.org/logo-og.png" />

                <DefaultTextInput
                    value={username}
                    placeholder="Username"
                    onChangeText={input => setUsername(input)}
                    textContentType="username"
                    autoCompleteType="username"
                    style={{
                        marginTop: '10%',
                        color: Colors.onSurfaceColor,
                        width: '100%',
                    }}
                />
            </View>
        </Form>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
    },
});

export default EditProfileScreen;
