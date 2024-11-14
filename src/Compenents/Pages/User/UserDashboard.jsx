import { useCallback, useContext, useEffect, useState } from "react"
import AuthContext from "../../../contexts/authContext"
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import moment from 'moment/moment';

const UserDashboard = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [userList, setUserList] = useState(null);

    const getUserListData = useCallback(async () => {
        try {
            const { data } = await api.get("/userTest/getUserTests");
            console.log("data", data);
            setUserList(data);
        } catch (err) {
            console.log("getUserListData", err);
        }
    }, []);

    useEffect(() => {
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
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">User Dashboard</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={handleLogout} > Logout </button>
                                                                                    <button
                                                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={() => navigate("/dashboard")} > Home </button>
                                                                                </div>

                                                                                <div class="auto-height text-center pt-1 mb-5 pb-1">
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

export default UserDashboard;