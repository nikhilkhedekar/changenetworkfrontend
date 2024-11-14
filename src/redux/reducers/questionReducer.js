import {
    GET_QUESTION_LIST_REQUEST,
    GET_QUESTION_LIST_SUCCESS,
    GET_QUESTION_LIST_FAIL
} from "../types/questionTypes";
import {
    questionListInitState
} from "../initState/questionInitStates";

export const getQuestionListReducer = (state = questionListInitState, action) => {
    switch (action.type){
        case GET_QUESTION_LIST_REQUEST:
            return { loading: true, questions: null };
        case GET_QUESTION_LIST_SUCCESS:
            console.log("getQuestionListReducer", action.payload);
            return { loading: false, questions: action.payload };
        case GET_QUESTION_LIST_FAIL:
            return { loading: false, questions: null, error: action.payload };
    }
    return state;
}