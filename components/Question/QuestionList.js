import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Col } from 'react-native-easy-grid';

import TitleText from '../../components/UI/TitleText';
import Colors from '../../constants/Colors';
import Overline from './Card/Overline';
import HomeHeader from '../Headers/HomeHeader';
import HotHeader from '../Headers/HotHeader';
import QuestionActions from '../Question/Card/QuestionActions';
import DisplayCat from '../Modals/DisplayCat';
import CategoriesSmallList from '../UI/CategoriesSmallList';
import { fetchQuestions } from '../../store/actions/questions';
import Loading from '../../components/UI/Loading';

const QuestionList = (props) => {
    
    var questions;
    if(props.routeName === 'Search') {
        questions = props.questions;
    } else {
        questions = useSelector((state) => state.questions.allQuestions);
    }

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
                            id: itemData.item.id,
                        })
                    }
                >
                    <View style={styles.insideCard}>
                        <View style={{ paddingHorizontal: 15 }}>
                            <Overline
                                question={itemData.item}
                                routeName="QuestionList"
                            />
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
                                <Col>
                                    <DisplayCat
                                        catId={itemData.item.catId}
                                        navigation={props.navigation}
                                    />
                                </Col>
                            </Col>
                            <Col style={{ height: '100%', flex: 0 }}>
                                <QuestionActions id={itemData.item.id} />
                            </Col>
                        </Grid>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };

    const renderSeparator = () => <View style={styles.separator}></View>;

    if (isLoading) {
        return <Loading />;
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
