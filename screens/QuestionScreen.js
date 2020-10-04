import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import TitleText from '../components/UI/TitleText';
import Overline from '../components/Question/Card/Overline';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import Edit from '../components/Modals/Edit';
import DisplayCat from '../components/Modals/DisplayCat';
import Loading from '../components/UI/Loading';
import { deleteQuestion } from '../store/actions/questions';

const QuestionScreen = (props) => {
    const question = useSelector((state) => state.questions.allQuestions).find(
        (ques) => ques.id === props.route.params.id
    );

    const [isLoading, setIsLoading] = useState(false);
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

    const [editModal, setEditModal] = useState(false);

    const toggleModal = () => {
        setEditModal(!editModal);
    };

    const handleIsLoading = (value) => {
        setIsLoading(value);
    };

    const dispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert(
            'Are you sure?',
            'You cannot restore deleted posts.',
            [
                {
                    text: 'Take me back!',
                    onPress: () => console.log('Take me back! Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        setIsLoading(true);
                        props.navigation.goBack();
                        try {
                            dispatch(
                                deleteQuestion(props.route.params.id)
                            ).then(() => setIsLoading(false));
                        } catch (error) {
                            console.log(error.message);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (isLoading || typeof question === 'undefined') {
        return (
            <LinearGradient
                colors={[
                    Colors.backgroundColor,
                    Colors.backgroundColorGradient,
                ]}
                style={styles.container}
            >
                <Loading />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[Colors.backgroundColor, Colors.backgroundColorGradient]}
            style={styles.container}
        >
            <View style={styles.insideContainer}>
                <View style={styles.overline}>
                    <Overline
                        question={question}
                        routeName="QuestionScreen"
                        onEditPress={toggleModal}
                        onDeletePress={handleDelete}
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <DisplayCat
                        catId={question.catId}
                        navigation={props.navigation}
                    />
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
            <Modal
                isVisible={editModal}
                onBackButtonPress={toggleModal}
                useNativeDriver={true}
                animationIn="slideInDown"
                animationOut="slideOutUp"
                animationInTiming={200}
                animationOutTiming={200}
                backdropOpacity={1}
                backdropColor={Colors.backgroundColor}
            >
                <Edit
                    closeModal={toggleModal}
                    id={question.id}
                    title={question.title}
                    catId={question.catId}
                    onIsLoading={(value) => handleIsLoading(value)}
                />
            </Modal>
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
