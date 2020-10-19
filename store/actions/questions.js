import Question from '../../models/question';
import Firebase from '../../config/Firebase';

export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE';
export const SET_FILTERS = 'SET_FILTERS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export const fetchQuestions = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://yesorno-by-mic.firebaseio.com/questions.json'
            );

            if (!response.ok) {
                throw new Error(
                    'Something went wrong when trying to get data.'
                );
            }

            const responseData = await response.json();
            const loadedQuestions = [];

            for (const key in responseData) {
                loadedQuestions.push(
                    new Question(
                        key,
                        responseData[key].userId,
                        responseData[key].catId,
                        responseData[key].title,
                        responseData[key].date,
                        responseData[key].upvotes,
                        responseData[key].yesVotes,
                        responseData[key].noVotes
                    )
                );
            }

            dispatch({
                type: SET_QUESTIONS,
                questions: loadedQuestions,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const toggleUpvote = (quesId, hasUpvoted) => {
    return async (dispatch, getState) => {

            const userToken = getState().auth.token;

            const responseGET = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${quesId}.json?auth=${userToken}`
            );

            if (!responseGET.ok) {
                throw new Error("Error: Couldn't find question.");
            }

            const responseGETData = await responseGET.json();

            if (hasUpvoted) {
                responseGETData.upvotes++;
            } else {
                responseGETData.upvotes--;
            }

            const response = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${quesId}.json?auth=${userToken}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        catId: responseGETData.catId,
                        userId: responseGETData.userId,
                        title: responseGETData.title,
                        date: responseGETData.date,
                        upvotes: responseGETData.upvotes,
                        yesVotes: responseGETData.yesVotes,
                        noVotes: responseGETData.noVotes,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error: Couldn't upvote question.");
            }

            dispatch({
                type: TOGGLE_UPVOTE,
                quesId,
                hasUpvoted,
            });
        
    };
};

export const filterQuestions = filterSettings => {
    return {
        type: SET_FILTERS,
        filterSettings: filterSettings,
    };
};

export const createQuestion = (title, catId) => {
    return async (dispatch, getState) => {
        const currentUserId = getState().auth.user.id;
        const userToken = getState().auth.token;
        const response = await fetch(
            `https://yesorno-by-mic.firebaseio.com/questions.json?auth=${userToken}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUserId,
                    catId,
                    title,
                    date: new Date().toString(),
                    upvotes: 0,
                    yesVotes: 0,
                    noVotes: 0,
                }),
            }
        );
        const responseData = await response.json();
        dispatch({
            type: CREATE_QUESTION,
            questionData: {
                id: responseData.name,
                userId: currentUserId,
                catId,
                title,
                date: new Date().toString(),
                upvotes: 0,
                yesVotes: 0,
                noVotes: 0,
            },
        });
    };
};

export const deleteQuestion = id => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const response = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json?auth=${userToken}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error("Error: Couldn't find question.");
            }

            dispatch({
                type: DELETE_QUESTION,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const editQuestion = (id, title, catId) => {
    return async (dispatch, getState) => {
        try {
            const userToken = getState().auth.token;
            const responseGET = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json?auth=${userToken}`
            );

            if (!responseGET.ok) {
                throw new Error("Error: Couldn't find question.");
            }

            const responseGETData = await responseGET.json();

            //TODO if currentuser.id === responseGETData.userId

            const response = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        catId: catId,
                        userId: responseGETData.userId,
                        title: title,
                        date: responseGETData.date,
                        upvotes: responseGETData.upvotes,
                        yesVotes: responseGETData.yesVotes,
                        noVotes: responseGETData.noVotes,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error: Couldn't edit question.");
            }

            dispatch({
                type: UPDATE_QUESTION,
                id,
                title,
                catId,
            });
        } catch (error) {
            throw error;
        }
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
