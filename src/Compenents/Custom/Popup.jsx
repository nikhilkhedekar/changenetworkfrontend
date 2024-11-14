import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { api } from "../../api/api";
import { useDispatch } from 'react-redux';
import { postAnswerAction } from '../../redux/actions/answerActions';

const Popup = ({ question, points, questionID, userTestID }) => {

    const [showPopup, setShowPopup] = useState(false);    
    const [answerList, setAnswerList] = useState(null);
    const selectedAnsRef = useRef(!!null);
    const dispatch = useDispatch();

    const getAnswerList = useCallback(async () => {
        const { data } = await api.post("/answer/getAnswer", {
            questionID
        });
        console.log("getAnswerList", data);
        setAnswerList(data);
    }, []);

    const popupHandler = () => {
        setShowPopup(true);
        getAnswerList();
    }

    const onChangeHandler = (e) => {
        selectedAnsRef.current = e.target.value;
    }

    const handleSubmit = useCallback(async () => {
        dispatch(postAnswerAction(questionID, userTestID, selectedAnsRef.current))        
        setShowPopup(false)
    }, [])

    console.log("selectedAnsRef", selectedAnsRef.current)

    return (
        <>

            <Button variant="success" onClick={() => popupHandler()}>
                Incomplete
            </Button>

            <Modal show={showPopup}>
                <Modal.Header onClick={() => { }}>
                    <Modal.Title>Question: {question}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input type="radio" id="first" name="answer" value={answerList?.payload[0]["answerList"][0]["answer"]} onChange={(e) => onChangeHandler(e)} />
                    <label htmlFor='first' >{answerList?.payload[0]["answerList"][0]["answer"]}</label><br />

                    <input type="radio" id="second" name="answer" value={answerList?.payload[0]["answerList"][1]["answer"]} onChange={(e) => onChangeHandler(e)} />
                    <label htmlFor='second' >{answerList?.payload[0]["answerList"][1]["answer"]}</label><br />

                    <input type="radio" id="third" name="answer" value={answerList?.payload[0]["answerList"][2]["answer"]} onChange={(e) => onChangeHandler(e)} />
                    <label htmlFor='third' >{answerList?.payload[0]["answerList"][2]["answer"]}</label><br />

                    <input type="radio" id="fourth" name="answer" value={answerList?.payload[0]["answerList"][3]["answer"]} onChange={(e) => onChangeHandler(e)} />
                    <label htmlFor='fourth' >{answerList?.payload[0]["answerList"][3]["answer"]}</label><br />

                </Modal.Body>

                <Button onClick={() => setShowPopup(false)}>
                    Close
                </Button>
                <Button onClick={() => handleSubmit()}>
                    Submit
                </Button>

            </Modal>

        </>
    )
}

export default Popup;