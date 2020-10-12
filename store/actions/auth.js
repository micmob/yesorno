import Firebase from '../../config/Firebase';
import User from '../../models/user';

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const SET_USERS = 'SET_USERS';
export const TOGGLE_UPVOTE_AUTH = 'TOGGLE_UPVOTE_AUTH';

export const fetchUsers = (text) => {
    return async dispatch => {
        console.log(text, 'wtf');
        const response = await fetch(
            'https://yesorno-by-mic.firebaseio.com/users.json'
        );
        if (!response.ok) {
            alert("Couldn't fetch users.");
        }
        const responseData = await response.json();
        var loadedUsers = [];
        for (key in responseData) {
            loadedUsers.push(
                new User(
                    key,
                    responseData[key].email,
                    responseData[key].username,
                    responseData[key].profilePicture,
                    responseData[key].createdQuestions,
                    responseData[key].upvotedQuestions
                )
            );
        }
        dispatch({
            type: SET_USERS,
            users: loadedUsers,
        });
    };
};

const getUserByEmail = async email => {
    const response = await fetch(
        'https://yesorno-by-mic.firebaseio.com/users.json'
    );
    if (!response.ok) {
        alert("Couldn't login.");
    }
    const responseData = await response.json();
    var user;
    for (key in responseData) {
        if (responseData[key].email === email) {
            user = new User(
                key,
                responseData[key].email,
                responseData[key].username,
                responseData[key].profilePicture,
                responseData[key].createdQuestions,
                responseData[key].upvotedQuestions
            );
        }
    }
    return user;
};

export const toggleIsAuth = value => {
    return async dispatch => {
        dispatch({ type: TOGGLE_IS_AUTH, value });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            await Firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            throw error;
        }
        const user = await getUserByEmail(email);
        dispatch({
            type: LOGIN,
            user,
        });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            throw error;
        }
        const uid = Firebase.auth().currentUser.uid;

        const ref = Firebase.database().ref('users').child(uid);
        ref.child('email').set(email);
        ref.child('username').set(null);
        ref.child('profilePicture').set(null);
        ref.child('createdQuestions').set(null);
        ref.child('upvotedQuestions').set(null);

        dispatch({
            type: SIGNUP,
            user: {
                id: uid,
                email,
                username: null,
                profilePicture: null,
                createdQuestions: [],
                upvotedQuestions: [],
            },
        });
    };
};

export const logout = () => {
    return async dispatch => {
        if (Firebase.auth().currentUser) {
            Firebase.auth().signOut();
            dispatch({
                type: LOGOUT,
            });
        } //else throw err
    };
};

export const autoLogIn = email => {
    return async dispatch => {
        const user = getUserByEmail(email);
        dispatch({
            type: LOGIN,
            user,
        });
    };
};

export const toggleUpvoteAuth = (quesId, hasUpvoted) => {
    return dispatch => {
        const userId = Firebase.auth().currentUser.uid;
        fetch(`https://yesorno-by-mic.firebaseio.com/users/${userId}.json`)
            .then(responseGET => {
                if (!responseGET.ok) {
                    alert("Couldn't find user.");
                }
                return responseGET.json();
            })
            .then(responseDataGET => {
                console.log(responseDataGET, 'nice data');
                var upvotedQuestions = [];
                if (responseDataGET.upvotedQuestions) {
                    upvotedQuestions = responseDataGET.upvotedQuestions;
                }
                if (hasUpvoted) {
                    upvotedQuestions.push(quesId);
                } else {
                    if (upvotedQuestions) {
                        upvotedQuestions = [...upvotedQuestions].filter(
                            ques => ques !== quesId
                        );
                    }
                }
                Firebase.database()
                    .ref('users')
                    .child(userId)
                    .update({ upvotedQuestions: upvotedQuestions })
                    .then(() => {
                        console.log('ok dispatch');
                        dispatch({
                            type: TOGGLE_UPVOTE_AUTH,
                            userId,
                            quesId,
                            hasUpvoted,
                        });
                    });
            });
    };
};

export const editProfile = (userId, username) => {
    return async dispatch => {
        const responseGET = await fetch(
            `https://yesorno-by-mic.firebaseio.com/users/${userId}.json`
        );

        if (!responseGET.ok) {
            alert("Couldn't find user.");
        }

        const responseDataGET = await responseGET.json();

        const response = await fetch(
            `https://yesorno-by-mic.firebaseio.com/users/${userId}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: responseDataGET.email,
                    username: username,
                    profilePicture: null, // TODO add profile pic
                    createdQuestions: responseDataGET.createdQuestions,
                    upvotedQuestions: responseDataGET.upvotedQuestions,
                }),
            }
        );

        if (!response.ok) {
            alert("Couldn't edit profile.");
        }

        const responseData = await response.json();

        dispatch({
            type: EDIT_PROFILE,
            user: {
                username, // TODO add pic
            },
        });
    };
};
