import Question from '../../models/question';

export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE';
export const SET_FILTERS = 'SET_FILTERS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export const fetchQuestions = () => {
    return async (dispatch) => {
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

export const toggleUpvote = (id) => {
    return async (dispatch) => {
        try {
            const responseGET = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json`
            );

            if (!responseGET.ok) {
                throw new Error("Error: Couldn't find question.");
            }

            const responseGETData = await responseGET.json();
            //TODO if currentuser hasn't upvoted this question already
            responseGETData.upvotes++;

            const response = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json`,
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
                id,
            });
        } catch (error) {
            alert(error.message);
        }
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
        const response = await fetch(
            'https://yesorno-by-mic.firebaseio.com/questions.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 'u1',
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
                userId: 'u1',
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

export const editQuestion = (id, title, catId) => {
    return async (dispatch) => {
        try {
            const responseGET = await fetch(
                `https://yesorno-by-mic.firebaseio.com/questions/${id}.json`
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
