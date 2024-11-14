import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getQuestionListReducer } from "../reducers/questionReducer";
import { postAnswerReducer } from "../reducers/answerReducer";

export const store = createStore(
    combineReducers({
        questions: getQuestionListReducer,

        answer: postAnswerReducer
    }),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);