import Firebase from '../../config/Firebase';
import User from '../../models/user';
import AsyncStorage from '@react-native-community/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const SET_USERS = 'SET_USERS';
export const TOGGLE_UPVOTE_AUTH = 'TOGGLE_UPVOTE_AUTH';

let timer;

export const fetchUsers = text => {
    return async dispatch => {
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

const getUserById = async id => {
    const response = await fetch(
        'https://yesorno-by-mic.firebaseio.com/users.json'
    );
    if (!response.ok) {
        alert("Couldn't login.");
    }
    const responseData = await response.json();
    var user;
    for (key in responseData) {
        if (key === id) {
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
    return async (dispatch, getState) => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYLuU3qxYJz903cV5rFNkcayl81Dfg6y0`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const resData = await response.json();

        if (!response.ok) {
            let error = 'Something went wrong white attempting to login.';
            if (resData.error.message === 'EMAIL_NOT_FOUND') {
                error = 'This email could not be found.';
            } else {
                if (resData.error.message === 'INVALID_PASSWORD') {
                    error = 'This password is invalid.';
                } else {
                    if (resData.error.message === 'USER_DISABLED') {
                        error =
                            'The user account has been disabled by an administrator.';
                    }
                }
            }

            throw new Error(error);
        }

        const user = await getUserByEmail(email);
        dispatch(setLogoutTimer(parseInt(resData.expiresIn) * 1000));
        dispatch({
            type: LOGIN,
            token: resData.idToken,
            refreshToken: resData.refreshToken,
            user,
        });
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(
            resData.idToken,
            resData.refreshToken,
            resData.localId,
            expirationDate
        );
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYLuU3qxYJz903cV5rFNkcayl81Dfg6y0',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        const resData = await response.json();

        if (!response.ok) {
            let error = 'Something went wrong white attempting to signup.';
            if (resData.error.message === 'EMAIL_EXISTS') {
                error =
                    'The email address is already in use by another account.';
            } else {
                if (resData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    error =
                        'We have blocked all requests from this device due to unusual activity. Try again later.';
                }
            }
            throw new Error(error);
        }

        const ref = Firebase.database().ref('users').child(resData.localId);
        ref.child('email').set(email);
        ref.child('username').set(null);
        ref.child('profilePicture').set(null);
        ref.child('createdQuestions').set(null);
        ref.child('upvotedQuestions').set(null);

        dispatch(setLogoutTimer(parseInt(resData.expiresIn) * 1000));
        dispatch({
            type: SIGNUP,
            token: resData.idToken,
            refreshToken: resData.refreshToken,
            user: {
                id: resData.localId,
                email,
                username: null,
                profilePicture: null,
                createdQuestions: [],
                upvotedQuestions: [],
            },
        });
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(
            resData.idToken,
            resData.refreshToken,
            resData.localId,
            expirationDate
        );
    };
};

export const logout = () => {
    return async dispatch => {
        clearLogoutTimer();
        await AsyncStorage.removeItem('@userData');
        dispatch({
            type: LOGOUT,
        });
    };
};

export const autoLogIn = (userId, token, refreshToken, expiresIn) => {
    return async dispatch => {
        const user = await getUserById(userId);
        dispatch(setLogoutTimer(expiresIn));
        dispatch({
            type: AUTO_LOGIN,
            token,
            refreshToken,
            user,
        });
        const expirationDate = new Date(
            new Date().getTime() + expiresIn
        );
        saveDataToStorage(
            token,
            refreshToken,
            userId,
            expirationDate
        );
    };
};

export const toggleUpvoteAuth = (quesId, hasUpvoted) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user.id;
        console.log(userId);
        fetch(`https://yesorno-by-mic.firebaseio.com/users/${userId}.json`)
            .then(responseGET => {
                if (!responseGET.ok) {
                    alert("Couldn't find user.");
                }
                return responseGET.json();
            })
            .then(responseDataGET => {
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
    return async (dispatch, getState) => {
        const userToken = getState().auth.token;
        const responseGET = await fetch(
            `https://yesorno-by-mic.firebaseio.com/users/${userId}.json`
        );

        if (!responseGET.ok) {
            alert("Couldn't find user.");
        }

        const responseDataGET = await responseGET.json();

        const response = await fetch(
            `https://yesorno-by-mic.firebaseio.com/users/${userId}.json?auth=${userToken}`,
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

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const refreshUserToken = () => {
    return async (dispatch, getState) => {
        const refreshToken = getState().auth.refreshToken;

        const userId = getState().auth.user.id;

        const response = await fetch(
            `https://securetoken.googleapis.com/v1/token?key=AIzaSyCYLuU3qxYJz903cV5rFNkcayl81Dfg6y0`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&refresh_token=${refreshToken}`
            }
        );

        const resData = await response.json();
        if (!response.ok) {            
            alert('Something went wrong!');
        }

        console.log(resData);

        dispatch(
            autoLogIn(
                resData.user_id,
                resData.id_token,
                resData.refresh_token,
                parseInt(resData.expires_in) * 1000
            )
        );
        
    };
};

const setLogoutTimer = expirationTime => {
    return async (dispatch, getState) => {
        timer = setTimeout(() => {
            dispatch(refreshUserToken());
        }, expirationTime);
    };
};

const saveDataToStorage = (token, refreshToken, userId, expirationDate) => {
    AsyncStorage.setItem(
        '@userData',
        JSON.stringify({
            token: token,
            refreshToken: refreshToken,
            userId: userId,
            expirationDate: expirationDate.toISOString(),
        })
    );
};
