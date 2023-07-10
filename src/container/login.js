import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/user/login/";

function Login() {
    const navigate = useNavigate();
    var [credentials, setCredentials] = useState({ email: "", password: "" });

    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });

    var onInputChange = (args) => {
        let copyOfState = { ...credentials };
        copyOfState[args.target.name] = args.target.value;
        setCredentials(copyOfState);
    }

    var Validate = (e) => {
        if (e.target.value !== "") {
            if (e.target.reportValidity())
                setErrMsg({ message: "", displayErr: "d-none" });
        }
    }
// dewoo sawant
    var sendLoginDetails = () => {
        if (credentials.email === "" || credentials.password === "") {
            setErrMsg({ message: "Please fill in Login Details First !", display: "d-block" })
        } else {
            axios.post(baseUrl, credentials).then((response) => {
                if(response.data.error !== undefined){
                    setErrMsg({ message: response.data.error, displayErr: "d-block" });
                }else{
                    setErrMsg({ message: "", displayErr: "d-none" });
                    console.log(response.data);
                    window.sessionStorage.setItem("userName",response.data[0].username);
                    window.sessionStorage.setItem("uid",response.data[0].uid);
                    window.location.href="/";
                }
            })
        }
    }

    return <div className='container pt-5 mt-5 col-md-7'>
            <h1>Version 3</h1>
        <div className='card text-dark bg-light pt-3'>
            <h1 className='text-center'>Login</h1>
            <div className="m-3 row">
                <label htmlFor="inputEmail" className="col-3 col-form-label">Email</label>
                <div className="col-8">
                    <input type="email" className="form-control" id="inputEmail"
                        value={credentials.email} onBlur={Validate}
                        onChange={onInputChange} name="email" placeholder="Email" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="inputPassword" className="col-3 col-form-label">Password</label>
                <div className="col-8">
                    <input type="password" className="form-control" id="inputPassword"
                        value={credentials.password} onBlur={Validate}
                        onChange={onInputChange} name="password" placeholder="Password" required />
                </div>
            </div>
            <div className="mb-3 row p-3 align-items-center m-auto">
                <div className="row">
                <p className='col-8'>Don't have account ?</p>
                <Link to="/register" className='col-4'>Register Here</Link>
                </div>
            </div>
            <div className="mb-3 row p-3 align-items-center m-auto">
                <div className="">
                    <button className="btn btn-primary" type='submit' onClick={sendLoginDetails}>Login</button>
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

export default Login;