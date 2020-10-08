import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableNativeFeedback,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import SmallText from '../components/UI/SmallText';
import DefaultTextInput from '../components/UI/DefaultTextInput';
import Colors from '../constants/Colors';
import CategoriesSmallList from '../components/UI/CategoriesSmallList';
import QuestionList from '../components/Question/QuestionList';
import BottomNavigator from '../components/Common/BottomNavigator';

const SearchScreen = props => {
    const allQuestions = useSelector(state => state.questions.allQuestions);

    const [questions, setQuestions] = useState(null);

    const [keyword, setKeyword] = useState('');

    const [matchesFound, setMatchesFound] = useState(true);

    const [catList, setCatList] = useState([]);

    // change to 'beforeRemove' after they fix the bug
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setKeyword('');
            setQuestions([]);
        });
        return unsubscribe;
    }, [props.navigation]);

    const onCatList = cat => {
        setCatList(cat);
    };

    const onKeyword = text => {
        setKeyword(text);
    };

    const onSearch = text => {
        Keyboard.dismiss();

        if (text.length > 0) {
            setKeyword(text);
        }
        if (keyword.length > 0) {
            const q = allQuestions
                .filter(item => catList.every(val => item.catId.includes(val)))
                .filter(
                    item =>
                        item.title
                            .toUpperCase()
                            .search(keyword.toUpperCase()) >= 0
                );
            setQuestions(q);
            if (q.length > 0) {
                setMatchesFound(true);
            } else {
                setMatchesFound(false);
            }
        }
    };

    return (
        <LinearGradient
            colors={[Colors.backgroundColor, Colors.backgroundColorGradient]}
            style={styles.container}
        >
            <View style={styles.insideContainer}>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 1 }}>
                        <DefaultTextInput
                            placeholder={'Search for something..'}
                            value={keyword}
                            height={50}
                            multiline={false}
                            onChangeText={onKeyword}
                            routeName="Search"
                            borderRadiusRight={0}
                            onSubmitEditing={onSearch}
                            style={{ marginBottom: 20 }}
                        />
                    </View>
                    <View
                        style={{
                            height: 50,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <TouchableNativeFeedback
                            onPress={onSearch}
                            background={TouchableNativeFeedback.Ripple(
                                Colors.touchColor,
                                true
                            )}
                        >
                            <View style={styles.iconContainer}>
                                <Icon
                                    name="magnify"
                                    size={30}
                                    color={Colors.onSurfaceColor}
                                />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.listInsideContainer}>
                    {matchesFound === false ? (
                        <View style={styles.noMatchesFoundContainer}>
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    paddingBottom: 20,
                                }}
                            >
                                <CategoriesSmallList
                                    onChange={onCatList}
                                    routeName="Search"
                                />
                            </View>
                            <SmallText style={styles.noMatchesText}>
                                No matches found.
                            </SmallText>
                        </View>
                    ) : (
                        <QuestionList
                            questions={questions}
                            navigation={props.navigation}
                            routeName="Search"
                        />
                    )}
                </View>
            </View>
            <BottomNavigator {...props} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: StatusBar.currentHeight,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.onBackgroundColor,
        marginBottom: 70,
    },
    insideContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        //flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    iconContainer: {
        height: 50,
        backgroundColor: Colors.surfaceColor,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
    },
    listInsideContainer: {
        flex: 1,
    },
    noMatchesFoundContainer: {
        alignItems: 'center',
    },
});

export default SearchScreen;
