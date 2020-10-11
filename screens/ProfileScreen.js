import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import TitleText from '../components/UI/TitleText';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import BottomNavigator from '../components/Common/BottomNavigator';
import ProfileImage from '../components/Profile/ProfileImage';
import TouchMe from '../components/UI/TouchMe';
import QuestionList from '../components/Question/QuestionList';
import { logout, toggleIsAuth } from '../store/actions/auth';

const ProfileScreen = props => {
    const questions = useSelector(state => state.questions.allQuestions).sort(
        (a, b) => Date.parse(a.date) < Date.parse(b.date)
    );
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const [postsColor, setPostsColor] = useState(Colors.brandColor);

    const [upvotedColor, setUpvotedColor] = useState(Colors.onSurfaceColor);

    const onMenuPress = buttonName => {
        if (buttonName === 'Posts') {
            //setQuestions(questions); //TODO
            setPostsColor(Colors.brandColor);
            setUpvotedColor(Colors.onSurfaceColor);
        } else {
            //buttonName === 'Upvoted'
            //setQuestions(questions); //TODO
            setUpvotedColor(Colors.brandColor);
            setPostsColor(Colors.onSurfaceColor);
        }
    };

    const handleLogOut = () => {
        dispatch(logout()).then(() => {
            dispatch(toggleIsAuth(false));
        });
    };

    return (
        <LinearGradient
            colors={[Colors.backgroundColor, Colors.backgroundColorGradient]}
            style={styles.container}
        >
            <View style={styles.logOut}>
                <TouchMe type="medium" onPress={handleLogOut}>
                    <Icon
                        name="logout"
                        size={25}
                        color={Colors.onSurfaceColor}
                    />
                </TouchMe>
            </View>
            <View style={styles.insideContainer}>
                <View style={styles.headerContainer}>
                    <ProfileImage image={user.profileImage} />
                    <TitleText style={styles.username}>
                        {user.username}
                    </TitleText>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchMe
                        type="small"
                        onPress={() => onMenuPress('Posts')}
                        style={{ height: 40, width: '40%' }}
                    >
                        <TitleText style={{ color: Colors.onSurfaceColor }}>
                            Posts
                        </TitleText>
                    </TouchMe>
                    <TouchMe
                        type="small"
                        onPress={() => onMenuPress('Upvoted')}
                        style={{ height: 40, width: '40%' }}
                    >
                        <TitleText style={{ color: Colors.onSurfaceColor }}>
                            Upvoted
                        </TitleText>
                    </TouchMe>
                </View>
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
        paddingTop: '5%',
    },
    username: {
        color: Colors.onBackgroundColor,
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: '5%',
    },
    headerContainer: {
        alignItems: 'center',
    },
    logOut: {
        padding: 5,
        alignItems: 'flex-end',
    },
});

export default ProfileScreen;
