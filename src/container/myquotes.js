import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/quotes/";

function MyQuotes() {
    const [myQuotes, setmyQuotes] = useState([]);
    const nav = useNavigate();
    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });

    useEffect(() => {
        loadmyQuotes();
    }, []);

    const loadmyQuotes = () => {
        axios.post(`${baseUrl}myquotes`, {uid:sessionStorage.getItem("uid")}).then((response) => {
            if (response.data.error !== undefined) {
            } else {
                setmyQuotes(response.data);
            }
        });
    };
    const AddPage=()=>{
     
          nav("/addmyquotes");

    }
    const Edit=(qid)=>{
     nav("/edit/" + qid);

    }
   const  Delete=(qid)=>{
        axios.post(baseUrl+"delete", {qid:qid}).then(response=>{
            if(response.data.error !== undefined){
                setErrMsg({ message: response.data.error, displayErr: "d-block" });
            }else{
                setErrMsg({ message: "", displayErr: "d-none" });
                loadmyQuotes();
            }
        })
    }
    return (
        <div className="container">
            <div className="text-center p-3">
                <h1>MyQuotes</h1>
            </div>
            <div>
                <p className={'alert alert-danger ' + errMsg.displayErr}>{errMsg.message}</p>
            </div>
            <div className="text-end col-11">
                <button className="btn btn-primary p-2 mb-2 col-2" onClick={AddPage}>Add</button>
            </div>
             {myQuotes.map((quote) => {
                    return (
                        <div className="card p-3 mb-3 col-11 m-auto bg-light shadow">
                            
                            <div className="col-11">
                                <h4>{quote.quote}</h4>
                                <div className="float-end"><h6>Likes : {quote.likes}</h6></div>
                            </div>
                            <div className="ms-5 text-body-secondary"> <h5>{quote.author}</h5></div>
                            
                           <div className="text-end">
                                <button className="btn btn-primary me-2 col-2 shadow" onClick={()=>{Edit(quote.qid)}}>Edit</button>
                                  
                                <button className="btn btn-danger col-2 shadow" onClick={()=>{Delete(quote.qid)}}>Delete</button>
                            </div>
                        </div>
                        
                    );
                })}
            
        </div>
    );
}
export default MyQuotes;
