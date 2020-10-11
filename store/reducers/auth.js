import {
    SIGNUP,
    LOGIN,
    TOGGLE_IS_AUTH,
    EDIT_PROFILE,
    LOGOUT,
    SET_USERS
} from '../actions/auth';

const initialState = {
    isAuth: false,
    user: {
        id: null,
        email: null,
        username: null,
        profilePicture: null,
        createdQuestions: [],
        upvotedQuestions: [],
    },
    users: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.value,
            };
        case SIGNUP:
            return {
                ...state,
                user: {
                    id: action.user.id,
                    email: action.user.email,
                    username: action.user.username,
                    profilePicture: action.user.profilePicture,
                    createdQuestions: action.user.createdQuestions,
                    upvotedQuestions: action.user.upvotedQuestions,
                },
            };
        case LOGIN:
            return {
                ...state,
                isAuth: true,
                user: action.user,
            };
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: {
                    id: null,
                    email: null,
                    username: null,
                    profilePicture: null,
                    createdQuestions: [],
                    upvotedQuestions: [],
                },
            };
        case EDIT_PROFILE:
            const updatedUser = state.user;
            updatedUser.username = action.user.username; // TODO add pic
            return {
                ...state,
                user: updatedUser,
            };
        default:
            return state;
    }
};

export default authReducer;
