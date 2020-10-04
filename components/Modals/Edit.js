import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import TitleText from './TitleText';
import CategoriesSmallList from './CategoriesSmallList';
import DefaultTextInput from '../UI/DefaultTextInput';
import { editQuestion, fetchQuestions } from '../../store/actions/questions';
import Loading from './Loading';

const Edit = (props) => {
    const [textInput, setTextInput] = useState(props.title);
    const [selectedCategories, setSelectedCategories] = useState(props.catId);

    const handleTextInput = (input) => {
        setTextInput(input);
    };

    const handleCatPress = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    };

    const dispatch = useDispatch();

    const handleEditQuestion = () => {
        if (textInput !== '' && selectedCategories.length > 0) {
            props.onIsLoading(true);
            dispatch(editQuestion(props.id, textInput, selectedCategories))
                .then(() => dispatch(fetchQuestions()))
                .then(() => props.onIsLoading(false));
            props.closeModal();
        } else {
            alert(
                'Text input cannot be empty and you need to pick at least 1 category.'
            );
        }
    };

    return (
        <View style={styles.insideModal}>
            <View style={styles.headerContainer}>
                <TitleText style={styles.header}>Edit</TitleText>
                <View style={styles.touchableContainer}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={Colors.onBackgroundColor}
                        onPress={handleEditQuestion}
                        style={styles.iconContainer}
                    >
                        <Icon
                            name="paper-plane"
                            color={Colors.backgroundColor}
                            size={25}
                            style={styles.icon}
                        />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ width: '100%' }}>
                <DefaultTextInput
                    value={textInput}
                    height={300}
                    multiline={true}
                    routeName="Edit"
                    onTextInput={(input) => handleTextInput(input)}
                />
            </View>

            <CategoriesSmallList
                routeName="Edit"
                onCatPress={(selectedCategories) =>
                    handleCatPress(selectedCategories)
                }
                catId={props.catId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        padding: 20,
    },
    insideModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 25,
        fontWeight: 'normal',
    },
    dropdown: {
        backgroundColor: Colors.surfaceColor,
        fontSize: 18,
        color: 'white',
    },
    cat: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        color: Colors.onBackgroundColor,
        paddingBottom: 20,
    },
    picker: {
        flex: 1,
        backgroundColor: Colors.onBackgroundColor,
        borderWidth: 1,
        marginLeft: 20,
        color: Colors.backgroundColor,
    },
    itemStyle: {
        color: Colors.backgroundColor,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    touchableContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    iconContainer: {
        flex: 0,
        borderRadius: 100,
    },
    icon: {
        borderRadius: 100,
        padding: 15,
        backgroundColor: Colors.brandColor,
    },
});

export default Edit;
