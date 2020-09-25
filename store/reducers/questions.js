import { QUESTIONS } from '../../data/dummy-data';
import {
    SET_FILTERS,
    TOGGLE_UPVOTE,
    CREATE_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    ANSWER_QUESTION,
} from '../actions/questions';
import { FILTER } from '../../constants/Filters';
import Question from '../../models/question';

const initialState = {
    allQuestions: QUESTIONS,
    filteredQuestions: QUESTIONS.filter(
        (ques) =>
            Math.abs(new Date().getTime() - Date.parse(ques.date)) <
            60 * 1000 * 60 * 24 * 7
    ),
    upvotedQuestions: [],
};

const filter = (state, value) => {
    const updatedFilteredQuestions = [...state.allQuestions].filter(
        (ques) => Math.abs(new Date().getTime() - Date.parse(ques.date)) < value
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

            const selectedQuestion = state.allQuestions.find(
                (ques) => ques.id === action.questionId
            );

            if (selectedQuestionIndex >= 0) {
                //if it's been upvoted
                selectedQuestion.upvotes--;
                const updatedUpvotedQuestions = [...state.upvotedQuestions];
                updatedUpvotedQuestions.splice(selectedQuestionIndex, 1);
                return { ...state, upvotedQuestions: updatedUpvotedQuestions };
            } else {
                selectedQuestion.upvotes++;
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
                    return filter(state, msPerDay);
                case FILTER.LAST_WEEK:
                    return filter(state, msPerDay * 7);
                case FILTER.LAST_MONTH:
                    return filter(state, msPerMonth);
                case FILTER.LAST_YEAR:
                    return filter(state, msPerYear);
                case FILTER.ALL_TIME:
                    const updatedFilteredQuestions = [...state.allQuestions];
                    return {
                        ...state,
                        filteredQuestions: updatedFilteredQuestions,
                    };
                default:
                    return state;
            }
        case CREATE_QUESTION:
            const newQuestion = new Question(
                Math.random().toString(), //TO DO when adding a DB
                action.questionData.title,
                action.questionData.catId,
                new Date().toString(),
                0,
                0,
                0
            );
            return {
                ...state,
                allQuestions: state.allQuestions.concat(newQuestion),
            };
        case ANSWER_QUESTION:
            const answeredQuestion = state.allQuestions.find(
                (ques) => ques.id === action.questionId
            );
            //TO DO check if user has already voted on this question
            if (action.answer === 'no') {
                answeredQuestion.noVotes++;
            } else {
                answeredQuestion.yesVotes++;
            }
            return state;
        default:
            return state;
    }
};

export default questionsReducer;
