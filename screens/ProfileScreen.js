import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    StatusBar,
    TouchableWithoutFeedback,
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';

import TitleText from '../components/UI/TitleText';
import Colors from '../constants/Colors';
import Stats from '../components/Profile/Stats';
import QuestionList from '../components/Question/QuestionList';
import { useSelector } from 'react-redux';
import BottomNavigator from '../components/Common/BottomNavigator';

const ProfileScreen = props => {
    const questions = useSelector(state => state.questions.allQuestions).sort(
        (a, b) => Date.parse(a.date) < Date.parse(b.date)
    );
    const user = useSelector(state => state.auth.user);

    const [postsColor, setPostsColor] = useState(Colors.brandColor);

    const [upvotedColor, setUpvotedColor] = useState(Colors.onBackgroundColor);

    const onMenuPress = buttonName => {
        if (buttonName === 'Posts') {
            //setQuestions(questions); //TODO
            setPostsColor(Colors.brandColor);
            setUpvotedColor(Colors.onBackgroundColor);
        } else {
            //buttonName === 'Upvoted'
            //setQuestions(questions); //TODO
            setUpvotedColor(Colors.brandColor);
            setPostsColor(Colors.onBackgroundColor);
        }
    };

    const Header = () => {
        return (
            <Row style={[styles.row, { height: 120 }]}>
                <View style={[styles.center, { paddingRight: 20 }]}>
                    <View style={{borderRadius: 100, flex: 0, elevation: 5}}>
                    <Image
                        source={{
                            uri: 'https://reactjs.org/logo-og.png',
                        }}
                        style={styles.image}
                    />
                    </View>
                </View>
                <View style={[styles.center, { flex: 1 }]}>
                    <TitleText style={styles.email}>
                        {user.email}
                    </TitleText>
                </View>
            </Row>
        );
    };
    return (
        <LinearGradient
            colors={[Colors.backgroundColor, Colors.backgroundColorGradient]}
            style={styles.container}
        >
            <View style={styles.insideContainer}>
                <Grid style={{ height: 250, flex: 0 }}>
                    <Header />
                    <Row style={[styles.row, { height: 70 }]}>
                        <Stats
                            iconName="arrow-up"
                            value="3.1k"
                            text="Most"
                            borderWidth={0.5}
                        />
                        <Stats
                            iconName="arrow-up"
                            value="1.3m"
                            text="Total"
                            borderWidth={0.5}
                        />
                        <Stats
                            iconName="pen"
                            value="1438"
                            text="Posts"
                            borderWidth={0}
                        />
                    </Row>
                    <Row style={styles.contentRow}>
                        <Grid style={{ height: 50 }}>
                            <Row style={styles.menuRow}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        onMenuPress('Posts');
                                    }}
                                >
                                    <Col style={styles.menuCol}>
                                        <TitleText
                                            style={[
                                                styles.menuText,
                                                { color: postsColor },
                                            ]}
                                        >
                                            Posts
                                        </TitleText>
                                    </Col>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        onMenuPress('Upvoted');
                                    }}
                                >
                                    <Col
                                        style={[
                                            styles.menuCol,
                                            { borderLeftWidth: 0.5 },
                                        ]}
                                    >
                                        <TitleText
                                            style={[
                                                styles.menuText,
                                                { color: upvotedColor },
                                            ]}
                                        >
                                            Upvoted
                                        </TitleText>
                                    </Col>
                                </TouchableWithoutFeedback>
                            </Row>
                        </Grid>
                    </Row>
                </Grid>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <QuestionList
                        questions={questions}
                        navigation={props.navigation}
                        routeName="Profile"
                    />
                </View>
            </View>
            <BottomNavigator {...props} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    insideContainer: {
        flex: 1,
        paddingTop: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.onBackgroundColor,
    },
    center: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    row: {
        flex: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    email: {
        color: Colors.onBackgroundColor,
        fontSize: 25,
        fontWeight: 'bold',
    },
    icon: {
        borderRadius: 100,
        width: 20,
        backgroundColor: Colors.brandColor,
    },
    insideCol: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerCol: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        paddingVertical: 2,
    },
    menuRow: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuCol: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.onBackgroundSeparatorColor,
    },
    contentRow: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 5,
        height: 50,
    },
    menuText: {
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
