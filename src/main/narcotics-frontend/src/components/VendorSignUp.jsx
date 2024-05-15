import "../css/CreateAccount.scss"

function VendorSignUp() {
    return (
        <div className={"create-account"}>
                <div className={"create-account-container"}>
                        <h1>Create account (Vendor)</h1>
                        <div className={"input-field"}>
                                <label htmlFor={"CompanyName"}>CompanyName:</label>
                                <input type={"text"} id={"CompanyName"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"username"}>Username:</label>
                                <input type={"text"} id={"username"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"Password"}>Password:</label>
                                <input type={"text"} id={"Password"}  className={"input-field-area"}required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"LicenseID"}>LicenseID:</label>
                                <input type={"text"} id={"LicenseID"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"PancardID"}>PancardID:</label>
                                <input type={"text"} id={"PancardID"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"Address"}>Address:</label>
                                <input type={"text"} id={"Address"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"City"}>City:</label>
                                <input type={"text"} id={"City"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>

                                <label htmlFor={"PhoneNumber"}>PhoneNumber:</label>
                                <input type={"text"} id={"PhoneNumber"} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"EmailId"}>EmailId:</label>
                                <input type={"text"} id={"EmailId"} className={"input-field-area"} required/>
                        </div>
                        <button className={"create"}>Create Account</button>
                </div>
        </div>
    );
}

export default VendorSignUp;