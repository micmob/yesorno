import Firebase from '../../config/Firebase';

export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';
export const EDIT_PROFILE = 'EDIT_PROFILE';

export const toggleIsAuth = value => {
    return async dispatch => {
        dispatch({ type: TOGGLE_IS_AUTH, value });
    };
};

export const logOut = () => {
    return async dispatch => {
        const response = await Firebase;
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
        const response = await fetch(
            'https://yesorno-by-mic.firebaseio.com/users.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username: null,
                    profilePicture: null,
                    createdQuestions: [],
                    upvotedQuestions: [],
                }),
            }
        );

        if (!response.ok) {
            alert("Couldn't signup.");
        }

        const responseData = await response.json();

        dispatch({
            type: SIGNUP,
            user: {
                userId: responseData.name,
                email,
                username: null,
                profilePicture: null,
                createdQuestions: [],
                upvotedQuestions: [],
            },
        });
    };
};

export const login = () => {
    return async dispatch => {
        dispatch({
            type: SIGNUP,
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
        const key = responseDataGET.userId;

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
