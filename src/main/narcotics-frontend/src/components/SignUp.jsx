import {useNavigate} from "react-router-dom";
import "../css/SignUp.scss";


function SignUp() {
    const navigate=useNavigate();
    function customerHandle() {
        navigate('/sign/customer');
    }

    function vendorHandle() {
        navigate('/sign/vendor');
    }

    return (

        <div className={"SignUp"}>
            {/*<h1 className={"SignUp-heading"}>Sign up page</h1>*/}
            <div onClick={customerHandle} className={"SignUp-customer SignUp-choice"}>Customer</div>
            <div onClick={vendorHandle} className={"SignUp-vendor SignUp-choice"}>Vendor</div>
        </div>
    );
}

export default SignUp;