export const TOGGLE_UPVOTE = 'TOGGLE_UPVOTE';
export const SET_FILTERS = 'SET_FILTERS';

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
    }
}