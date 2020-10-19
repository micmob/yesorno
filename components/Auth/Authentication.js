import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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

    const handleContinuePress = async () => {
        if (props.action === 'Signup') {
            setIsLoading(true);
            await dispatch(signup(email, password)).catch(error => {
                alert(error.message);
            });
            setIsLoading(false);
            props.navigation.navigate('ConfigProfileAfterSignup', {
                email,
                password,
                initialProfileSetup: true,
            });
        } else {
            setIsLoading(true);
            await dispatch(login(email, password)).catch(error => {
                alert(error.message);
            });
            setIsLoading(false);
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
                importantForAutofill="yes"
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
                importantForAutofill="yes"
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
