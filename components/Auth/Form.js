import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';
import Container from '../Common/Container';
import Colors from '../../constants/Colors';
import TitleText from '../UI/TitleText';
import { TouchableHighlight } from 'react-native-gesture-handler';
import LargeButton from '../Common/LargeButton';

const Form = props => {
    const [bottomButtonClicked, setBottomButtonClicked] = useState(false);

    //TODO fix KeyboardAvoidingView: behaviour and the other one

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.titleContainer}>
                    <TitleText style={styles.title}>{props.title}</TitleText>
                </View>
                <View>{props.children}</View>

                <LargeButton
                    style={{ marginTop: '10%' }}
                    text={props.buttonText}
                    onPress={props.onButtonPress}
                />

                <View style={styles.bottomTextContainer}>
                    <TitleText style={styles.bottomText}>
                        {props.bottomPhrase}
                    </TitleText>

                    <TouchableHighlight
                        onPress={props.onBottomButtonPress}
                        onHideUnderlay={() => setBottomButtonClicked(false)}
                        onShowUnderlay={() => setBottomButtonClicked(true)}
                        underlayColor="transparent"
                    >
                        <TitleText
                            style={[
                                styles.bottomText,
                                {
                                    color: bottomButtonClicked
                                        ? Colors.surfaceColor
                                        : Colors.brandColor,
                                    fontWeight: 'bold',
                                },
                            ]}
                        >
                            {props.bottomButtonText}
                        </TitleText>
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
