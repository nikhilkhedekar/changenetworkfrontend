import { useCallback, useEffect, useState } from "react";
import { api } from "../../../api/api";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionList } from "../../../redux/actions/questionActions";
import { Modal, Button } from 'react-bootstrap'
import AnswerPopup from "../../Custom/AnswerPopup";

const ResultPage = () => {

    const [testData, setTestData] = useState(null);
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const questionList = useSelector(data => data?.questions);
    const navigate = useNavigate();

    const getUserTestData = useCallback(async () => {
        const { data } = await api.post("/userTest/getUserTest", {
            userTestID: location?.state?.userTestID
        });
        console.log("getUserTestData", data);
        setTestData(data);
    }, [])

    useEffect(() => {
        getUserTestData();
        dispatch(getQuestionList(location?.state?.testID));
    }, []);

    console.log("questionListSelector", questionList);

    return (
        <div>
            <main id="main">
                <section id="about" class="about1">
                    <div class="login-form-bg h-100">
                        <div class="container h-100">
                            <div class="row justify-content-center h-100">
                                <div class="col-xl-12">
                                    <div class="form-input-content">
                                        <div class=" login-form mb-0">
                                            <section class="h-100 gradient-form" style={{ background: "#eee;" }}>
                                                <div class="container h-100">
                                                    <div class="row d-flex justify-content-center align-items-center h-100">
                                                        <div class="">
                                                            <div class="card rounded-3 text-black">
                                                                <div class="row g-0">
                                                                    <div class="col-lg-12">
                                                                        <div class="card-body p-md-5 mx-md-4">

                                                                            <div class="text-center">
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">{params?.testId} Test Result</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => navigate("/dashboard")} > Home </button>
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => navigate("/userDashboard")} > User Dashboard </button>
                                                                                </div>

                                                                                <div class="auto-height text-center pt-1 mb-5 pb-1">
                                                                                    <div class="text-center">
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">User Name: {testData?.payload[0]["userDetails"][0]["name"]}</h5>
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">User Email: {testData?.payload[0]["userDetails"][0]["email"]}</h5>
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">Test Name: {testData?.payload[0]["testDetails"][0]["testType"]}</h5>
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">Description: {testData?.payload[0]["testDetails"][0]["testDescription"]}</h5>
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">Test Score: {testData?.payload[0]["testDetails"][0]["testScore"]}</h5>
                                                                                        <h5 class="mt-1 mb-5 pb-1 signin">User Test Score: {testData?.payload[0]["userScore"]}</h5>
                                                                                    </div>
                                                                                    <table id="customers" class="table">
                                                                                        <tr>
                                                                                            <th><strong>Questions</strong></th>
                                                                                            <th><strong>Points</strong></th>
                                                                                            <th><strong>View Details</strong></th>
                                                                                        </tr>
                                                                                        {
                                                                                            questionList ? questionList?.questions?.map((data, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>{data.question}</td>
                                                                                                        <td>{data.points}</td>
                                                                                                        <td>
                                                                                                            <AnswerPopup questionID={data._id} userTestID={location?.state?.userTestID} question={data.question} answer={data.answer} explanation={data.explanation} points={data.points} />
                                                                                                        </td >
                                                                                                    </tr>
                                                                                                )
                                                                                            }) : null
                                                                                        }
                                                                                    </table>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ResultPage;