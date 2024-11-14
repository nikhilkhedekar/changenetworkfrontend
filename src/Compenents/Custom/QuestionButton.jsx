import { useCallback, useEffect, useState } from "react";
import { api } from "../../api/api";
import Popup from "./Popup";

const QuestionButton = ({ questionID, userTestID, question, points }) => {

    const [answerData, setAnswerData] = useState(null);

    const getUserAnswer = useCallback(async () => {
        const { data } = await api.post("/userAnswer/getUserAnswer", {
            questionID,
            userTestID
        });
        console.log("questionData", { questionID, data });
        setAnswerData(data);
    }, []);

    useEffect(() => {
        getUserAnswer();
    }, []);

    return (
        <>
            {
                answerData?.payload?.length > 0 ? <button disabled className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >
                    <span>Completed</span>
                </button> :
                    <Popup question={question} points={points} questionID={questionID} userTestID={userTestID} />
            }
        </>
    )
}

export default QuestionButton;