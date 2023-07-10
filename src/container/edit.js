import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/quotes/";


function EditQuotes() {
    const navi = useNavigate();
    var {qid} = useParams();
    const [quotesDetails, setQuotesDetails] = useState({'quote':"", 'author':"", qid:qid, uid:sessionStorage.getItem("uid")});
    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });
    var getQuote=()=>{
        axios.post(baseUrl+'editqid', {qid:qid, uid:sessionStorage.getItem("uid")}).then(response=>{
            if(response.data.error !== undefined){
                navi("/myquotes");
            }else{
                setErrMsg({ message: "", displayErr: "d-none" });
                setQuotesDetails(response.data[0]);
            }
        })
    }
    useEffect(()=>{
        getQuote();
    });

    var onInputChange = (args) => {
        let copyOfState = { ...quotesDetails };
        copyOfState[args.target.name] = args.target.value;
        setQuotesDetails(copyOfState);
    }

    var Validate = (e) => {
        if (e.target.value !== "") {
            if (e.target.reportValidity())
                setErrMsg({ message: "", displayErr: "d-none" });
        }
    }

    

    var EditQuote=()=>{
        axios.post(baseUrl+'edit', quotesDetails).then(response=>{
            if(response.data.error !== undefined){
                setErrMsg({ message: response.data.error, displayErr: "d-block" });
            }else{
                setErrMsg({ message: "", displayErr: "d-none" });
                navi("/myquotes");
            }
        })
    }

    return (
        <div className="container">
            <div className="container pt-5 mt-5 col-md-7">
                <div className="card text-dark bg-light pt-3">
                    <h1 className="text-center">Edit Quote</h1>
                    <div className="m-3 row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                value={quotesDetails.author}
                                onBlur={Validate}
                                onChange={onInputChange}
                                name="author"
                                placeholder="author"
                                required
                            />
                        </div>
                    </div>
                    <div className="m-3 row">
                        <div className="col">
                            <input
                                type="text-area"
                                className="form-control py-5"
                                id="quote"
                                value={quotesDetails.quote}
                                onBlur={Validate}
                                onChange={onInputChange}
                                name="quote"
                                placeholder="quote"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3 row p-3 align-items-center m-auto">
                        <div className="">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={EditQuote}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 align-items-center m-auto">
                    <div
                        className={
                            "alert alert-danger text-center " +
                            errMsg.displayErr
                        }
                    >
                        {errMsg.message}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditQuotes;