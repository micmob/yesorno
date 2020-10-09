import { SIGNUP, LOGIN, TOGGLE_IS_AUTH } from '../actions/auth';

const initialState = {
    isAuth: false,
    user: {
        email: null,
    },
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.value
            };
        case SIGNUP:
            return {
                ...state,
                user: {
                    email: action.user.email,
                },
            };
        case LOGIN:
            console.log('login was here');
        default:
            return state;
    }
};

export default authReducer;
