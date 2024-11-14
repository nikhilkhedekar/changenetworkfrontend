import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const validateNewPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;

    const handleSignup = async () => {
        // if(password || confirmPassword) {
        //     setErrorMsg("Password should match confirm password");
        //     return;
        // }
        if(!validateNewPassword.test(password)){
            alert("Password must contain 1 capital letter, 1 small letter, 1 integer, 1 special character, minimum length 6 characters, max 16 characters");
            return;
        }
        authCtx.register(companyName, companyEmail, phone, password);
        alert("Check email to verify your account.");

        // if(error) {
        //     console.log("registerError", error.message);
        //     setErrorMsg(error);
        //     return;
        // }                     
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
                                                                    <div class="col-lg-6">
                                                                        <div class="card-body p-md-5 mx-md-4">

                                                                            <div class="text-center">
                                                                                <h4 class="mt-1 mb-5 pb-1 signin">Sign Up</h4>
                                                                            </div>

                                                                            <div class="mt-5 mb-5 login-input" >

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">User Name</label>
                                                                                    <input type="text" id="form2Example11" class="form-control"
                                                                                        placeholder="User Name"
                                                                                        value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">Email Address</label>
                                                                                    <input type="email" id="form2Example11" class="form-control"
                                                                                        placeholder="Email address"
                                                                                        value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example11">Phone</label>
                                                                                    <input type="text" id="form2Example11" class="form-control"
                                                                                        placeholder="Contact No"
                                                                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example22">Password</label>
                                                                                    <input type="password" id="form2Example22" class="form-control"
                                                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                                                    />

                                                                                </div>

                                                                                {/* <div class="form-outline mb-4 form-group">
                                                                                    <label class="form-label" for="form2Example22">Password</label>
                                                                                    <input type="password" id="form2Example22" class="form-control"
                                                                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                    />

                                                                                </div> */}

                                                                                <div class="text-center pt-1 mb-5 pb-1">
                                                                                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                                                        onClick={handleSignup}
                                                                                        type="button">Sign
                                                                                        up</button>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                                                        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                                                            <h4 class="mb-4">What is Lorem Ipsum?</h4>
                                                                            <p class="small mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                                            </p>
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

export default SignUp