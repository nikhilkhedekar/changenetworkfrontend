import { useState } from "react";

const ContactUs = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [companyEmail, setCompanyEmail] = useState();



    return (
        <div>
            <label>First Name:
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>Last Name:
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>Company:
                <input value={company} onChange={(e) => setCompany(e.target.value)} />
            </label>
            <label>Company Email:
                <input value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
            </label>
            <button>Submit</button>
        </div>
    )
}

export default ContactUs;