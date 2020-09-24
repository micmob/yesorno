import { QUESTIONS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_UPVOTE } from '../actions/questions';
import { FILTER } from '../../constants/Filters';

const initialState = {
    allQuestions: QUESTIONS,
    filteredQuestions: QUESTIONS,
    upvotedQuestions: [],
};

const filter = (state, value) => {
    const updatedFilteredQuestions = [...state.allQuestions].filter(
        (ques) => Math.abs(new Date() - ques.date) < value
    );
    return {
        ...state,
        filteredQuestions: updatedFilteredQuestions,
    };
};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_UPVOTE:
            const selectedQuestionIndex = state.upvotedQuestions.findIndex(
                (ques) => ques.id === action.questionId
            );
            if (selectedQuestionIndex >= 0) {
                const updatedUpvotedQuestions = [...state.upvotedQuestions];
                updatedUpvotedQuestions.splice(selectedQuestionIndex, 1);
                return { ...state, upvotedQuestions: updatedUpvotedQuestions };
            } else {
                const selectedQuestion = state.allQuestions.find(
                    (ques) => ques.id === action.questionId
                );
                return {
                    ...state,
                    upvotedQuestions: state.upvotedQuestions.concat(
                        selectedQuestion
                    ),
                };
            }
        case SET_FILTERS:
            const appliedFilter = action.filterSettings;

            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;

            switch (appliedFilter) {
                case FILTER.LAST_24_HOURS:
                    console.log('last 24 hours');
                    return filter(state, msPerDay);
                case FILTER.LAST_WEEK:
                    return filter(state, msPerDay*7);
                case FILTER.LAST_MONTH:
                    return filter(state, msPerMonth);
                case FILTER.LAST_YEAR:
                    return filter(state, msPerYear);
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default questionsReducer;
