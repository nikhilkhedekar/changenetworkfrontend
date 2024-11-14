import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getQuestionList } from "../../../redux/actions/questionActions";
import QuestionButton from "../../Custom/QuestionButton";
import { api } from "../../../api/api";

const TestPage = () => {

    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const questionList = useSelector(data => data?.questions);
    const answerStatus = useSelector(data => data?.answer);
    const navigate = useNavigate();

    console.log("routeData", { params, location });

    const submitTest = useCallback( async () => {
        const { data } = await api.post("/userTest/submitUserTest", {
            userTestID: location?.state?.userTestID
        });
        console.log("submitTest", data);
        navigate(`/resultPage/${params?.testId}`, {
            state: {
                userTestID: location?.state?.userTestID,
                testID: location?.state?.testID
            }
        });
    }, []);

    useEffect(() => {
        dispatch(getQuestionList(location?.state?.testID));
    }, [answerStatus]);

    console.log("questionListSelector", questionList);
    console.log("answerStatus", answerStatus);

    return(
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
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">{params?.testId} Test</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => submitTest()} > Cancel Test </button>
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => submitTest()} > Submit Test </button>
                                                                                </div>

                                                                                <div class="auto-height text-center pt-1 mb-5 pb-1">
                                                                                    <div class="text-center">
                                                                                        <h4 class="mt-1 mb-5 pb-1 signin">Question List</h4>
                                                                                    </div>
                                                                                    <table id="customers" class="table">
                                                                                        <tr>
                                                                                            <th><strong>Questions</strong></th>
                                                                                            <th><strong>Points</strong></th>
                                                                                            <th><strong>Status</strong></th>
                                                                                        </tr>
                                                                                        {
                                                                                            questionList ? questionList?.questions?.map((data, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>{data.question}</td>
                                                                                                        <td>{data.points}</td>
                                                                                                        <td>
                                                                                                            {<QuestionButton questionID={data._id} userTestID={location?.state?.userTestID} question={data.question} points={data.points} />}
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

export default TestPage;