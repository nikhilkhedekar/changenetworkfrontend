import { api } from "../../api/api";
import {
    POST_ANSWER_REQUEST,
    POST_ANSWER_SUCCESS,
    POST_ANSWER_FAIL
} from "../types/answerTypes";


export const postAnswerAction = (questionID, userTestID, answer) => async (dispatch) => {
    try {
        dispatch({ type: POST_ANSWER_REQUEST });
        const { data } = await api.post("/userAnswer/postUserAnswer", {
            questionID,
            userTestID,
            answer
        });
        console.log("postAnswerAction", data);
        dispatch({
            type: POST_ANSWER_SUCCESS,
            payload: data.payload
        });
    } catch (error) {
        dispatch({
            type: POST_ANSWER_FAIL,
            payload: error
        });
    }
}