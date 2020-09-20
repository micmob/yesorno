import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableNativeFeedback,
} from 'react-native';
import SmallText from '../components/SmallText';
import DefaultTextInput from '../components/DefaultTextInput';
import Colors from '../constants/Colors';
import CategoriesSmallList from '../components/CategoriesSmallList';
import { QUESTIONS } from '../data/dummy-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QuestionList from '../components/QuestionList';

const SearchScreen = (props) => {
    const [questions, setQuestions] = useState(null);

    const [keyword, setKeyword] = useState('');

    const [matchesFound, setMatchesFound] = useState(true);

    const [catList, setCatList] = useState([]);

    // change to 'beforeRemove' after they fix the bug
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setKeyword('');
            setQuestions(null);
        }
        );
        return unsubscribe;
    }, [props.navigation]);

    const onCatList = (cat) => {
        setCatList(cat);
    };

    const onKeyword = (text) => {
        setKeyword(text);
    };

    const onSearch = (text) => {
        if (text.length > 0) {
            setKeyword(text);
        }
        if (keyword.length > 0) {
            const q = QUESTIONS.filter(item => catList.every(val => item.catId.includes(val))).filter(
                (item) =>
                    item.title.toUpperCase().search(keyword.toUpperCase()) >= 0
            );
            setQuestions(q);
            if (q.length > 0) {
                setMatchesFound(true);
            } else {
                setMatchesFound(false);
            }
            setKeyword('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 1 }}>
                        <DefaultTextInput
                            placeholder={'Search for something..'}
                            keyword={keyword}
                            height={50}
                            multiline={false}
                            searchKeyword={onKeyword}
                            routeName="Search"
                            borderRadiusRight={0}
                            onSubmitEditing={onSearch}
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
                                Colors.brandColor,
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
                                <CategoriesSmallList catList={onCatList} routeName='Search' />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.backgroundColor,
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
        backgroundColor: Colors.backgroundColor,
    },
    listInsideContainer: {
        flex: 1,
    },
    noMatchesFoundContainer: {
        alignItems: 'center',
    },
});

export default SearchScreen;
