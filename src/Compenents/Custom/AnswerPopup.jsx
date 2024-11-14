import { useCallback, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { api } from '../../api/api';

const AnswerPopup = ({ questionID, userTestID, question, answer, explanation, points }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [answerData, setAnswerData] = useState(null);

    const getUserAnswer = useCallback(async () => {
        const { data } = await api.post("/userAnswer/getUserAnswer", {
            questionID,
            userTestID
        });
        console.log("getUserAnswer", { questionID, data });
        setAnswerData(data);
    }, []);

    const popupHandler = () => {
        setShowPopup(true);
        getUserAnswer();
    }

    return (
        <>
            <Button variant="success" onClick={() => popupHandler()}>
                View
            </Button>

            <Modal show={showPopup}>
                <Modal.Header onClick={() => { }}>
                    <Modal.Title>Question: {question}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <>
                        <span>Right Answer: {answer}</span><br />
                        <span>Explanation: {explanation}</span><br />
                        <span>Question Points: {points}</span><br />
                        <hr />
                        <span>User Answer: {answerData?.payload?.length > 0 ? answerData?.payload[0]["answer"] : ""}</span><br />
                        <span>User Answer Points: {answerData?.payload?.length > 0 ? answerData?.payload[0]["points"] : ""}</span>
                    </>

                </Modal.Body>

                <Button onClick={() => setShowPopup(false)}>
                    Close
                </Button>

            </Modal>
        </>
    )
}

export default AnswerPopup;