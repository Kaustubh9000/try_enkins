import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/user/register/";

function Register() {
    var navigate = useNavigate();

    var [registerDetails, setRegisterDetails] = useState({ firstName:"", lastName: "", mobile:"",email:"", password:"",confirmPassword: ""});

    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });

    var onInputChange = (args) => {
        let copyOfState = { ...registerDetails };
        copyOfState[args.target.name] = args.target.value;
        setRegisterDetails(copyOfState);
    }

    var Validate = (e) => {
        if (e.target.value !== "") {
            if (e.target.reportValidity())
                setErrMsg({ message: "", displayErr: "d-none" });
        }
    }

    var sendLoginDetails = () => {
        if (registerDetails.email === "" || registerDetails.password === "") {
            setErrMsg({ message: "Please fill in Login Details First !", display: "d-block" })
        } else {
            axios.post(baseUrl, registerDetails).then((response) => {
                debugger;
                if(response.data.error !== undefined){
                setErrMsg({ message: response.data.error, displayErr: "d-block" });
                }else{
                    setErrMsg({ message: "", displayErr: "d-none" });
                    // response.data.role;
                        window.location.href="/";
                }
            })
        }
    }

    return <div className='container pt-5 mt-5 col-md-7'>

        <div className='card text-dark bg-light pt-3'>
        <h1 className='text-center'>Register</h1>
            <div className="m-3 row">
                <label htmlFor="firstName" className="col-3 col-form-label">First name</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="firstName"
                        value={registerDetails.firstName} onBlur={Validate}
                        onChange={onInputChange} name="firstName" placeholder="Enter first name" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="lastName" className="col-3 col-form-label">Last name</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="lastName"
                        value={registerDetails.lastName} onBlur={Validate}
                        onChange={onInputChange} name="lastName" placeholder="Enter last name" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="email" className="col-3 col-form-label">Email</label>
                <div className="col-8">
                    <input type="email" className="form-control" id="email" 
                        value={registerDetails.email} onBlur={Validate}
                        onChange={onInputChange} name="email" placeholder="Enter email" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="password" className="col-3 col-form-label">Password</label>
                <div className="col-8">
                    <input type="password" className="form-control" id="password" 
                        value={registerDetails.password} onBlur={Validate}
                        onChange={onInputChange} name="password" placeholder="Enter password" required />
                </div>
            </div>

            <div className="m-3 row">
                <label htmlFor="confirmPassword" className="col-3 col-form-label">Confirm Password</label>
                <div className="col-8">
                    <input type="password" className="form-control" id="confirmPassword" 
                        value={registerDetails.confirmPassword} onBlur={Validate}
                        onChange={onInputChange} name="confirmPassword"placeholder="Confirm password" required />
                </div>
            </div>

            <div className="m-3 row">
                <label htmlFor="mobile_number" className="col-3 col-form-label">Mobile Number</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="mobile" 
                        value={registerDetails.mobile} onBlur={Validate}
                        onChange={onInputChange} name="mobile"placeholder="Enter Mobile Number" required />
                </div>
            </div>

            <div className="mb-3 row p-3 align-items-center m-auto">
                <div className="row">
                <p className='col-8'>alreadyhave account?</p>
                <Link to="/login" className='col-4'>Login</Link>
                </div>
            </div>
            <div className="mb-3 row p-3 align-items-center m-auto">
                <div className="">
                    <button className="btn btn-primary" type='submit' onClick={sendLoginDetails}>Register</button>
                </div >
            </div>

        </div>
        <div className="row mt-2 align-items-center m-auto">
            <div className={"alert alert-danger text-center " + errMsg.displayErr}>
                {errMsg.message}
            </div>
        </div>

    </div>
}

export default Register;