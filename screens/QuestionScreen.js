import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';
import Overline from '../components/Overline';
import Button from '../components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';

const QuestionScreen = (props) => {
    const question = props.route.params.question;

    const [noColor, setNoColor] = useState(Colors.onBackgroundColor);
    const [yesColor, setYesColor] = useState(Colors.onBackgroundColor);

    const handleNoPress = () => {
        if (noColor === Colors.onBackgroundColor) {
            setNoColor(Colors.brandColor);
            setYesColor(Colors.onBackgroundColor);
        } else {
            setNoColor(Colors.onBackgroundColor);
        }
    };

    const handleYesPress = () => {
        if (yesColor === Colors.onBackgroundColor) {
            setYesColor(Colors.brandColor);
            setNoColor(Colors.onBackgroundColor);
        } else {
            setYesColor(Colors.onBackgroundColor);
        }
    };

    return (
        <LinearGradient
            colors={[Colors.backgroundColor, Colors.backgroundColorGradient]}
            style={styles.container}
        >
            <View style={styles.insideContainer}>
                <View style={styles.overline}>
                    <Overline question={question} />
                </View>
                <TitleText style={styles.title}>{question.title}</TitleText>
                <View style={styles.buttonsHolder}>
                    <TouchableWithoutFeedback onPress={handleNoPress}>
                        <View style={styles.iconContainer}>
                            <Icon
                                name="expressionless"
                                size={50}
                                color={noColor}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleYesPress}>
                        <View style={styles.iconContainer}>
                            <Icon name="smiling" size={50} color={yesColor} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.onBackgroundColor,
        marginBottom: 20,
        marginTop: 20,
    },
    buttonsHolder: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        width: '100%',
    },
    overline: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    insideContainer: {
        padding: 20,
    },
    iconContainer: {
        flex: 0,
        padding: 10,
    },
});

export default QuestionScreen;
