import { postAnswerInitState } from "../initState/answerInitStates";
import {
    POST_ANSWER_REQUEST,
    POST_ANSWER_SUCCESS,
    POST_ANSWER_FAIL
} from "../types/answerTypes";

export const postAnswerReducer = (state = postAnswerInitState, action) => {
    switch (action.type){
        case POST_ANSWER_REQUEST:
            return { loading: true, answer: null };
        case POST_ANSWER_SUCCESS:
            console.log("postAnswerReducer", action.payload);
            return { loading: false, answer: action.payload };
        case POST_ANSWER_FAIL:
            return { loading: false, answer: null, error: action.payload };
    }
    return state;
}