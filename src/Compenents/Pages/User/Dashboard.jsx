import { useCallback, useContext, useEffect, useState } from "react"
import AuthContext from "../../../contexts/authContext"
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import moment from 'moment/moment';
import TestButton from "../../Custom/TestButton";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [userList, setUserList] = useState(null);
    const [testList, setTestList] = useState(null);
    const [singleUserList, setSingleUserList] = useState(null);

    const getSingleUserListData = useCallback(async () => {
        try {
            const { data } = await api.get("/userTest/getUserTests");
            console.log("getSingleUserListData", data);
            setSingleUserList(data);
        } catch (err) {
            console.log("getSingleUserListData", err);
        }
    }, []);

    const getUserListData = useCallback(async () => {
        try {
            const { data } = await api.get("/userTest/getAllUserTests");
            console.log("getUserListData", data);
            setUserList(data);
        } catch (err) {
            console.log("getUserListData", err)
        }
    }, []);

    const getTestListData = useCallback(async () => {
        try {
            const { data } = await api.get("/test/getTestList");
            console.log("getTestListData", data);
            setTestList(data);
        } catch (err) {
            console.log("getTestListData", err);
        }
    }, []);

    const completeTest = useCallback(async (testID, testType) => {
        await api.post("/userTest/postUserTest", {
            testID
        })
            .then((data) => {
                console.log("postUserTest", data);
                navigate(`/testPage/${testType}`, {
                    state: {
                        testID,
                        userTestID: data?.data?.payload?._id
                    }
                })
            })
            .catch((err) => {
                console.log("completeTest", err);
            })
    }, [])

    useEffect(() => {
        getSingleUserListData();
        getTestListData();
        getUserListData();
    }, []);

    const handleLogout = () => {
        authCtx.logout();
    }

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
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">Change Network Demo</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={handleLogout} > Logout </button>
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => navigate("/userDashboard")} > User Dashboard </button>
                                                                                </div>

                                                                                <div class="auto-height text-center pt-1 mb-5 pb-1">
                                                                                    <div class="text-center">
                                                                                        <h4 class="mt-1 mb-5 pb-1 signin">Test List</h4>
                                                                                    </div>
                                                                                    <table id="customers" class="table">
                                                                                        <tr>
                                                                                            <th><strong>Test Name</strong></th>
                                                                                            <th><strong>Score</strong></th>
                                                                                            <th><strong>Status</strong></th>
                                                                                        </tr>
                                                                                        {
                                                                                            testList ? testList?.payload?.map((data, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>{data.testType}<br />Description: {data.testDescription}</td>
                                                                                                        <td>{data.testScore}</td>
                                                                                                        <td>
                                                                                                            <TestButton completeTest={completeTest} testID={data._id} testType={data.testType} />
                                                                                                        </td >
                                                                                                    </tr>
                                                                                                )
                                                                                            }) : null
                                                                                        }
                                                                                    </table>
                                                                                </div>

                                                                                <div class="auto-height text-center pt-1 mb-5 pb-1">
                                                                                    <div class="text-center">
                                                                                        <h4 class="mt-1 mb-5 pb-1 signin">Leaderboard</h4>
                                                                                    </div>
                                                                                    <table id="customers" class="table">
                                                                                        <tr>
                                                                                            <th><strong>User Name</strong></th>
                                                                                            <th><strong>Test Name</strong></th>
                                                                                            <th><strong>Score</strong></th>
                                                                                            <th><strong>Date</strong></th>
                                                                                        </tr>
                                                                                        {
                                                                                            userList ? userList?.payload?.map((data, i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td>{data.userDetails[0]["name"]}</td>
                                                                                                        <td>{data.testDetails[0]["testType"]}</td>
                                                                                                        <td>{data.userScore}</td>
                                                                                                        <td>{moment(data.updatedAt).format("LL")}</td>
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

export default Dashboard;