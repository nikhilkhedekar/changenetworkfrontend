import {
    GET_QUESTION_LIST_REQUEST,
    GET_QUESTION_LIST_SUCCESS,
    GET_QUESTION_LIST_FAIL
} from "../types/questionTypes";
import { api } from "../../api/api";

export const getQuestionList = (testID) => async (dispatch) => {
    try {
        dispatch({ type: GET_QUESTION_LIST_REQUEST });
        const { data } = await api.post(`/question/getQuestionList`, {
            testID
        })
        console.log("getQuestionList", data);
        dispatch({
            type: GET_QUESTION_LIST_SUCCESS,
            payload: data.payload
        });
    } catch (error) {
        dispatch({
            type: GET_QUESTION_LIST_FAIL,
            payload: error
        });
    }
}