import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import DefaultInputText from '../UI/DefaultTextInput';
import Container from '../Common/Container';
import Colors from '../../constants/Colors';
import TitleText from '../UI/TitleText';
import TouchMe from '../UI/TouchMe';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Form = props => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [signupClicked, setSignupClicked] = useState(false);

    const handleEmailChange = email => {
        setEmail(email);
    };

    const handlePasswordChange = password => {
        setPassword(password);
    };

    // const handleContinuePress = () => {
        
    // };

    //TODO fix KeyboardAvoidingView: behaviour and the other one

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.titleContainer}>
                    <TitleText style={styles.title}>{props.title}</TitleText>
                </View>
                <View>
                    <DefaultInputText
                        style={{
                            marginBottom: '3%',
                            color: Colors.onSurfaceColor,
                        }}
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder="Email"
                        textContentType="emailAddress"
                        autoCompleteType="email"
                        keyboardType="email-address"
                    />
                    <DefaultInputText
                        style={{
                            marginBottom: '10%',
                            color: Colors.onSurfaceColor,
                        }}
                        value={password}
                        onChangeText={handlePasswordChange}
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        autoCompleteType="password"
                    />
                </View>

                <TouchMe
                    type="small"
                    onPress={() => {}}
                    style={{
                        backgroundColor: Colors.brandColor,
                        borderWidth: 0,
                        height: 60,
                        width: '100%',
                    }}
                    touchColor={Colors.accentColor}
                >
                    <TitleText
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Colors.accentColor,
                        }}
                    >
                        Continue
                    </TitleText>
                </TouchMe>

                <View style={styles.bottomTextContainer}>
                    {props.action === 'Login' && (
                        <TitleText style={styles.bottomText}>
                            Don't have an account yet?{' '}
                        </TitleText>
                    )}
                    {props.action === 'Signup' && (
                        <TitleText style={styles.bottomText}>
                            Already have an account?{' '}
                        </TitleText>
                    )}
                    <TouchableHighlight
                        onPress={() => {
                            props.navigation.navigate(
                                props.action === 'Login' ? 'Signup' : 'Login'
                            );
                        }}
                        onHideUnderlay={() => setSignupClicked(false)}
                        onShowUnderlay={() => setSignupClicked(true)}
                        underlayColor="transparent"
                    >
                        {props.action === 'Login' ? (
                            <TitleText
                                style={[
                                    styles.bottomText,
                                    {
                                        color: signupClicked
                                            ? Colors.surfaceColor
                                            : Colors.brandColor,
                                        fontWeight: 'bold',
                                    },
                                ]}
                            >
                                SIGN UP!{' '}
                            </TitleText>
                        ) : (
                            <TitleText
                                style={[
                                    styles.bottomText,
                                    {
                                        color: signupClicked
                                            ? Colors.surfaceColor
                                            : Colors.brandColor,
                                        fontWeight: 'bold',
                                    },
                                ]}
                            >
                                LOG IN!{' '}
                            </TitleText>
                        )}
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        width: '100%',
        justifyContent: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        paddingBottom: '10%',
    },
    title: {
        fontSize: 30,
        color: Colors.onBackgroundColor,
        fontWeight: 'bold',
    },
    bottomTextContainer: {
        flexDirection: 'row',
        paddingTop: '10%',
    },
});

export default Form;
