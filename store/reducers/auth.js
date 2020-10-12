import {
    SIGNUP,
    LOGIN,
    TOGGLE_IS_AUTH,
    EDIT_PROFILE,
    LOGOUT,
    SET_USERS,
    TOGGLE_UPVOTE_AUTH,
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
    users: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_UPVOTE_AUTH:
            const user = state.users.find(user => user.id === action.userId);

            //change user

            var upvotedQuestions = [];
            
            if(user.upvotedQuestions) {
                upvotedQuestions = user.upvotedQuestions;
            }

            if (action.hasUpvoted) {
                upvotedQuestions.push(action.quesId);
            } else {
                upvotedQuestions = [...upvotedQuestions].filter(
                    ques => ques !== action.quesId
                );
            }

            //change users

            const indexInUsers = state.users.findIndex(
                user => user.id === action.userId
            );
            const updatedUsers = [...state.users];
            updatedUsers[indexInUsers] = user;
            updatedUsers[indexInUsers].upvotedQuestions = upvotedQuestions;

            return {
                ...state,
                user: {
                    id: state.user.id,
                    email: state.user.email,
                    username: state.user.username,
                    profilePicture: state.user.profilePicture,
                    createdQuestions: state.user.createdQuestions,
                    upvotedQuestions: upvotedQuestions,
                },
                users: updatedUsers,
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
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
                user: {
                    id: action.user.id,
                    email: action.user.email,
                    username: action.user.username,
                    profilePicture: action.user.profilePicture,
                    createdQuestions: action.user.createdQuestions,
                    upvotedQuestions: action.user.upvotedQuestions,
                },
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
