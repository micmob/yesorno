import { QUESTIONS } from '../../data/dummy-data';
import {
    SET_FILTERS,
    TOGGLE_UPVOTE,
    CREATE_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    ANSWER_QUESTION,
    SET_QUESTIONS,
} from '../actions/questions';
import { FILTER } from '../../constants/Filters';
import Question from '../../models/question';

const initialState = {
    allQuestions: [],
    filteredQuestions: [],
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
            return state;
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
                action.questionData.id,
                action.questionData.userId,
                action.questionData.catId,
                action.questionData.title,
                action.questionData.date,
                action.questionData.upvotes,
                action.questionData.yesVotes,
                action.questionData.noVotes
            );
            return {
                ...state,
                filteredQuestions: state.filteredQuestions.concat(newQuestion),
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
        case SET_QUESTIONS:
            const newFilteredQuestions = [];
            for (var ques in state.filteredQuestions) {
                if (action.questions[ques.id]) {
                    newFilteredQuestions.push(action.questions[ques.id]);
                }
            }
            return {
                allQuestions: action.questions,
                filteredQuestions: newFilteredQuestions,
            };
        case UPDATE_QUESTION:
            const updatedQuestion = [...state.allQuestions].find(
                (ques) => ques.id === action.id
            );
            updatedQuestion.title = action.title;

            const indexallQ = state.allQuestions.findIndex(
                (ques) => ques.id === action.id
            );
            const updatedAllQuestions = [...state.allQuestions];
            updatedAllQuestions[indexallQ] = updatedQuestion;

            const indexfilteredQ = state.filteredQuestions.findIndex(
                (ques) => ques.id === action.id
            );
            const updatedFilteredQuestions = [...state.filteredQuestions];
            if (indexfilteredQ >= 0) {
                updatedFilteredQuestions[indexfilteredQ] = updatedQuestion;
            }

            return {
                updatedAllQuestions,
                updatedFilteredQuestions,
            };
        default:
            return state;
    }
};

export default questionsReducer;
