import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import Overline from './Overline';
import HomeHeader from './HomeHeader';
import HotHeader from './HotHeader';
import QuestionActions from './QuestionActions';
import DisplayCat from './DisplayCat';
import { Grid, Col, Row } from 'react-native-easy-grid';
import CategoriesSmallList from './CategoriesSmallList';
import { fetchQuestions } from '../store/actions/questions';
import Loading from '../components/Loading';
import { useFocusEffect } from '@react-navigation/native';

const QuestionList = (props) => {
    const questions = useSelector((state) => state.questions.allQuestions);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadQuestions = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await dispatch(fetchQuestions());
            setIsRefreshing(false);
        } catch (error) {
            alert(error.message);
        }
    }, [dispatch]);

    useEffect(() => {
        const focusSub = props.navigation.addListener('focus', () => {
            setIsLoading(true);
            loadQuestions().then(() => {
                setIsLoading(false);
            });
        });
        return focusSub;
    }, [loadQuestions]);

    const renderQuestion = (itemData) => {
        return (
            <View style={styles.card}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                        Colors.brandColor
                    )}
                    onPress={() =>
                        props.navigation.navigate('Question', {
                            question: itemData.item,
                        })
                    }
                >
                    <View style={styles.insideCard}>
                        <View style={{ paddingHorizontal: 15 }}>
                            <Overline question={itemData.item} />
                            <TitleText style={styles.title}>
                                {itemData.item.title}
                            </TitleText>
                        </View>
                        <Grid>
                            <Col
                                style={{
                                    height: '100%',
                                    flex: 1,
                                    marginRight: 5,
                                    paddingLeft: 15,
                                }}
                            >
                                <DisplayCat
                                    item={itemData.item.catId}
                                    navigation={props.navigation}
                                />
                            </Col>
                            <Col style={{ height: '100%', flex: 0 }}>
                                <QuestionActions question={itemData.item} />
                            </Col>
                        </Grid>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };

    const renderSeparator = () => <View style={styles.separator}></View>;

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => item.id}
                renderItem={renderQuestion}
                ItemSeparatorComponent={renderSeparator}
                onRefresh={loadQuestions}
                refreshing={isRefreshing}
                ListHeaderComponent={(itemData) => {
                    if (props.routeName === 'Home') return <HomeHeader />;
                    else {
                        if (props.routeName === 'Hot') {
                            return <HotHeader />;
                        } else {
                            if (props.routeName === 'Search') {
                                return (
                                    <View
                                        style={{
                                            paddingHorizontal: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        <CategoriesSmallList />
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        }
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    card: {
        marginHorizontal: 5,
        flex: 1,
    },
    separator: {
        marginHorizontal: 10,
        height: 0.5,
        backgroundColor: Colors.onBackgroundSeparatorColor,
    },
    insideCard: {
        flex: 1,
        paddingVertical: 5,
    },
    title: {
        marginVertical: 5,
    },
});

export default QuestionList;
