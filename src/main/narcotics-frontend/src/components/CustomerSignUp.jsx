import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/CreateAccount.scss";

function CustomerSignUp() {
    const [customerDetails, setCustomerDetails] = useState({
            username:"",
            pass:"",
            firstName:"",
            lastName:"",
            address:"",
            aadharNum:"",
            phoneNum:"",
            emailId:"",
            upiId:"",
            dob:""
    });
    const navigate=useNavigate();
    function handleChange(event){
            const {name,value}=event.target;
            setCustomerDetails((c)=>{return {...customerDetails,[name]:value}});
    }

    function creatAccount() {
            console.log(customerDetails);
            postCustomer().then(()=>{
                    navigate(`/customer/${customerDetails.username}/home`,{replace:true});
            })
    }

    async function postCustomer(){
            const loginResponse = await fetch("http://localhost:8080/user/customer",{
                    method:"POST",
                    headers:{
                            "content-type":"application/json"
                    },
                    body: JSON.stringify({
                            username:customerDetails.username,
                            pass:customerDetails.pass
                    })
            });
            const customerResponse = await fetch(`http://localhost:8080/user/customer/${customerDetails.username}`,{
                    method:"PUT",
                    headers:{
                            "content-type":"application/json"
                    },
                    body: JSON.stringify({
                            firstName:customerDetails.firstName,
                            lastName:customerDetails.lastName,
                            aadharNum:customerDetails.aadharNum,
                            dob:customerDetails.dob,
                            phoneNum:customerDetails.phoneNum,
                            emailId:customerDetails.emailId,
                            address:customerDetails.address,
                            upiId:customerDetails.upiId
                    })
            });
    }

    return (
        <div className={"create-account"}>
                <div className={"create-account-container"}>
                        <h1>Create account (Customer)</h1>
                        <div className={"input-field"}>
                                <label htmlFor={"firstName"}>First name:</label>
                                <input type={"text"} name={"firstName"} onChange={handleChange} required  className={"input"}/>
                                <label htmlFor={"lastName"}>Last name:</label>
                                <input type={"text"} name={"lastName"} onChange={handleChange} required className={"input"}/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"username"}>Username:</label>
                                <input type={"text"} name={"username"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"pass"}>Password:</label>
                                <input type={"text"} name={"pass"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                        <label htmlFor={"address"}>Address:</label>
                        <input type={"text"} name={"address"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"aadharNum"}>Adhaar number:</label>
                                <input type={"text"} name={"aadharNum"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"phoneNum"}>PhoneNumber:</label>
                                <input type={"text"} name={"phoneNum"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"emailId"}>EmailId:</label>
                                <input type={"text"} name={"emailId"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"upiId"}>UpiId:</label>
                                <input type={"text"} name={"upiId"} onChange={handleChange} className={"input-field-area"}required/>
                        </div>
                        <div className={"input-field"}>
                                <label htmlFor={"dob"}>DOB:</label>
                                <input type={"date"} name={"dob"} onChange={handleChange} className={"input-field-area"} required/>
                        </div>
                        <button onClick={creatAccount} className={"create"}>Create Account</button>
                </div>
        </div>
    );
}

export default CustomerSignUp;