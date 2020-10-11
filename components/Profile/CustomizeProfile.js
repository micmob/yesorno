import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Form from '../Auth/Form';
import ProfileImage from '../Profile/ProfileImage';
import DefaultTextInput from '../UI/DefaultTextInput';
import Colors from '../../constants/Colors';

const CustomizeProfile = props => {
    const [username, setUsername] = useState();
    const oldUsername = useSelector(state => state.auth.user.username);
    const userId = useSelector(state => state.auth.user.id);

    useEffect(() => {
        if (oldUsername) {
            setUsername(oldUsername);
        } else {
            setUsername(null);
        } // TODO pic
    }, []);

    return (
        <Form
            onButtonPress={() => {
                props.onButtonPress(userId, username);
            }}
            buttonText="Finish"
            bottomButtonText={props.bottomButtonText}
            onBottomButtonPress={props.onBottomButtonPress}
            title={props.title}
            navigation={props.navigation}
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

export default CustomizeProfile;
