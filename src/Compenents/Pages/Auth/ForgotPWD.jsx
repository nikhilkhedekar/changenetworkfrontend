import { useContext, useState } from "react";
import AuthContext from "../../../contexts/authContext";

const ForgotPWD = () => {

    const [companyEmail, setCompanyEmail] = useState("");
    const authCtx = useContext(AuthContext);

    const forgotPWDHandler = () => {
        authCtx.forgotPassword(companyEmail);
    }

    return(
        <div>
            <label>Company Email:
                <input value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
            </label>

            <button onClick={forgotPWDHandler} >Submit</button>
        </div>
    )
}

export default ForgotPWD;