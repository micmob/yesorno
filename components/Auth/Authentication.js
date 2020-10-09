import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Form from './Form';
import DefaultTextInput from '../UI/DefaultTextInput';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import Loading from '../../components/UI/Loading';
import { signup, login } from '../../store/actions/auth';

const Authentication = props => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmailChange = email => {
        setEmail(email);
    };

    const handlePasswordChange = password => {
        setPassword(password);
    };

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <Loading />;
    }

    const handleContinuePress = () => {
        if (props.action === 'Signup') {
            dispatch(signup(email, password))
                .then(() => {
                    props.navigation.navigate('EditProfile', {
                        email,
                        password,
                        initialProfileSetup: true,
                    });
                })
                .catch((error) => {
                    switch(error.code){
                        case 'auth/email-already-in-use':
                            alert('That email address is taken.');
                        case 'auth/invalid-email':
                            alert('Your email address is invalid!');
                        case 'auth/weak-password':
                            alert('Pick a stronger password.');
                        default:
                            alert('Something went wrong. Check your details again!');
                    }
                    
                });
        } else {
            setIsLoading(true);
            dispatch(login(email, password)).then(() => {
                setIsLoading(false);
            });
        }
    };

    return (
        <Form
            onButtonPress={handleContinuePress}
            buttonText="Continue"
            bottomPhrase={
                props.action === 'Login'
                    ? "Don't have an account yet? "
                    : 'Already have an account? '
            }
            bottomButtonText={props.action === 'Login' ? 'SIGN UP!' : 'LOG IN!'}
            onBottomButtonPress={() => {
                props.navigation.navigate(
                    props.action === 'Login' ? 'Signup' : 'Login'
                );
            }}
            {...props}
        >
            <DefaultTextInput
                style={styles.email}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                textContentType="emailAddress"
                autoCompleteType="email"
                keyboardType="email-address"
            />
            <DefaultTextInput
                style={{
                    color: Colors.onSurfaceColor,
                }}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
                autoCompleteType="password"
            />
        </Form>
    );
};

const styles = StyleSheet.create({
    email: {
        marginBottom: '3%',
        color: Colors.onSurfaceColor,
    },
});

export default Authentication;
