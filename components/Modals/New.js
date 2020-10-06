import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import TitleText from '../UI/TitleText';
import CategoriesSmallList from '../UI/CategoriesSmallList';
import DefaultTextInput from '../UI/DefaultTextInput';
import { createQuestion } from '../../store/actions/questions';

const New = (props) => {
    const [textInput, setTextInput] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleTextInput = (input) => {
        setTextInput(input);
    };

    const handleCatPress = (selectedCategories) => {
        setSelectedCategories(selectedCategories);
    };

    const dispatch = useDispatch();

    const handleNewQuestion = () => {
        if (textInput !== '' && selectedCategories.length > 0) {
            dispatch(createQuestion(textInput, selectedCategories));
            setTextInput('');
            setSelectedCategories([]);
            props.closeModal();
            alert('You question has been posted.');
        } else {
            alert(
                'Text input cannot be empty and you need to pick at least 1 category.'
            );
        }
    };

    return (
        <View style={styles.insideModal}>
            <View style={styles.headerContainer}>
                <TitleText style={styles.header}>New</TitleText>
                <View style={styles.touchableContainer}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={Colors.onBackgroundColor}
                        onPress={handleNewQuestion}
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
            <DefaultTextInput
                placeholder={
                    'Need inspiration? Well.. too bad, I got none either.'
                }
                height={300}
                multiline={true}
                routeName="New"
                onTextInput={(input) => handleTextInput(input)}
            />
            <CategoriesSmallList
                routeName="New"
                onChange={(selectedCategories) =>
                    handleCatPress(selectedCategories)
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    insideModal: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.backgroundColor,
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

export default New;
