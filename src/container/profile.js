import axios from 'axios';
import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/user/";

function Profile() {
    var navigate = useNavigate();
    useEffect(()=>{
        axios.post(baseUrl+"profile", {uid:sessionStorage.getItem("uid")}).then(response=>{
            if(response.data.error !== undefined){
                setErrMsg({ message: response.data.error, displayErr: "d-block" });
                }else{
                    console.log(response);
                    setErrMsg({ message: "", displayErr: "d-none" });
                    let data = response.data[0];
                    setProfile(data);
                }
        })
    }, [])
    var [profile, setProfile] = useState({ first_name:"", last_name: "", email:"", address:"",mobile:"", uid:sessionStorage.getItem("uid")});

    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });

    var onInputChange = (args) => {
        debugger;
        let copyOfState = { ...profile };
        copyOfState[args.target.name] = args.target.value;
        setProfile(copyOfState);
    }

    var Validate = (e) => {
        if (e.target.value !== "") {
            if (e.target.reportValidity())
                setErrMsg({ message: "", displayErr: "d-none" });
        }
    }

    var sendProfileDetails = () => {
        if (profile.email === "" || profile.last_name === "") {
            setErrMsg({ message: "Please fill in Profile Details First !", display: "d-block" })
        } else {
            axios.post(baseUrl+"editprofile", profile).then((response) => {
                debugger;
                if(response.data.error !== undefined){
                setErrMsg({ message: response.data.error, displayErr: "d-block" });
                }else{
                    setErrMsg({ message: "", displayErr: "d-none" });
                    navigate("/");
                }
            })
        }
    }

    return <div className='container pt-5 mt-5 col-md-7'>

        <div className='card text-dark bg-light pt-3'>
        <h1 className='text-center'>Profile</h1>

            <div className="m-3 row">
                <label htmlFor="firstName" className="col-3 col-form-label">First name</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="firstName"
                        value={profile.first_name} onBlur={Validate}
                        onChange={onInputChange} name="firstName" placeholder="Enter first name" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="last name" className="col-3 col-form-label">Last name</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="lastName"
                        value={profile.last_name} onBlur={Validate}
                        onChange={onInputChange} name="lastName" placeholder="Enter last name" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="email" className="col-3 col-form-label">Email</label>
                <div className="col-8">
                    <input type="email" className="form-control" id="email" 
                        value={profile.email} onBlur={Validate}
                        onChange={onInputChange} name="email" placeholder="Enter email" required />
                </div>
            </div>
            <div className="m-3 row">
                <label htmlFor="address" className="col-3 col-form-label">Address</label>
                <div className="col-8">
                    <input type="address" className="form-control" id="address" 
                        value={profile.address} onBlur={Validate}
                        onChange={onInputChange} name="address" placeholder="Enter address" required />
                </div>
            </div>

           

            <div className="m-3 row">
                <label htmlFor="mobile" className="col-3 col-form-label">Mobile Number</label>
                <div className="col-8">
                    <input type="text" className="form-control" id="mobile" 
                        value={profile.mobile} onBlur={Validate}
                        onChange={onInputChange} name="mobile" placeholder="Enter Mobile Number" required />
                </div>
            </div>

           
            <div className="mb-3 row p-3 align-items-center m-auto">
                <div className="">
                    <button className="btn btn-primary" type='submit' onClick={sendProfileDetails}>Save</button>
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

export default Profile;