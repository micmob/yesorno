import Firebase from '../../config/Firebase';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';

export const toggleIsAuth = (value) => {
    return async dispatch => {
        dispatch({ type: TOGGLE_IS_AUTH, value });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        var err;
        try {
            const response = await Firebase.auth().createUserWithEmailAndPassword(
                email,
                password
            ).catch((error) => {
                err = error;
                console.log('help');
            })
            if(err) {
                console.log('help2');
                throw err;
                
            }
        } catch(error) {
            console.log('help3');
            throw(error);
        }

        dispatch({
            type: SIGNUP,
            user: {
                email,
            },
        });
    };
};

export const login = () => {
    return async dispatch => {
        console.log('help');
        dispatch({
            type: SIGNUP,
        });
    };
};
