import { SIGNUP, LOGIN, TOGGLE_IS_AUTH, EDIT_PROFILE } from '../actions/auth';

const initialState = {
    isAuth: false,
    user: {
        userId: null,
        email: null,
        username: null,
        profilePicture: null,
        createdQuestions: [],
        upvotedQuestions: [],
    },
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.value,
            };
        case SIGNUP:
            return {
                ...state,
                user: {
                    userId: action.user.userId,
                    email: action.user.email,
                    username: action.user.username,
                    profilePicture: action.user.profilePicture,
                    createdQuestions: action.user.createdQuestions,
                    upvotedQuestions: action.user.upvotedQuestions
                },
            };
        case LOGIN:
            console.log('login was here');
        case EDIT_PROFILE:
            const updatedUser = state.user;
            updatedUser.username = action.user.username; // TODO add pic
            return {
                ...state,
                user: updatedUser
            }
        default:
            return state;
    }
};

export default authReducer;
