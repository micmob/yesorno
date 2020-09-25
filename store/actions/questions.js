export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE';
export const SET_FILTERS = 'SET_FILTERS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const toggleUpvote = (id) => {
    return {
        type: TOGGLE_UPVOTE,
        questionId: id,
    };
};

export const filterQuestions = (filterSettings) => {
    return {
        type: SET_FILTERS,
        filterSettings: filterSettings,
    };
};

export const createQuestion = (title, catId) => {
    return async (dispatch) => {
        const response = await fetch('https://yesorno-by-mic.firebaseio.com/questions.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, catId }),
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_QUESTION,
            questionData: {
                title,
                catId,
            },
        });
    };
};

export const answerQuestion = (answer, quesId) => {
    return {
        type: ANSWER_QUESTION,
        answerData: {
            answer,
            quesId,
        },
    };
};
