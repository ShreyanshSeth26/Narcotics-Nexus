// import React from 'react';

import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Login() {
    const navigate= useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [numIncorrectPassword, setNumIncorrectPassword] = useState(0);
    let loginDetails={username:"",pass:"",userType:""};
    function changeUsername(event){
        setUsername(event.target.value);
    }
    function changePassword(event){
        setPassword(event.target.value);
    }

    function sign(){
        navigate("/sign");
    }

    function login() {
        getLoginDetails().then(()=>{
            console.log(loginDetails);
            if(loginDetails.username==null){
                setMessage("Such user doesn't exist");
                return;
            }
            else if(loginDetails.blocked){
                setMessage("Your account is blocked");
                return;
            }
            else if (loginDetails.pass!==password){
                setMessage("Wrong Password");
                setNumIncorrectPassword(n=>++n);
                console.log(numIncorrectPassword);
                if(numIncorrectPassword>=3) {
                    blockAccount(loginDetails).then();
                }
                return;
            }
            else{
                setMessage("Correct Credentials");
                if(loginDetails.userType==="CUSTOMER"){
                    navigate(`/customer/${username}/home`);
                }
                else{
                    navigate(`/vendor/${username}/home`);
                }
            }
        });
    }
    async function blockAccount(loginDetails){
        loginDetails.blocked=true;
        console.log(loginDetails);
        const blockResponse = await fetch(`http://localhost:8080/login/customer`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(loginDetails)
        });
    }
    async function getLoginDetails(){
        const loginResponse = await fetch(`http://localhost:8080/login/${username}`);
        let login = await loginResponse.json();
        console.log(login);
        loginDetails=login;
    }

    return (
        <div>
            <h1>Login</h1>
            <h3>{message}</h3>
            <label htmlFor={"username"}>Username:</label>
            <input id={"username"} type="text" onChange={changeUsername}/>
            <br/>
            <br/>
            <label htmlFor={"password"}>Password:</label>
            <input id={"password"} type="text" onChange={changePassword}/><br/>
            <br/>
            <button onClick={login}>Submit</button>
            <br/>
            <br/>
            <button onClick={sign}>Sign up</button>
        </div>
    );
}

export default Login;