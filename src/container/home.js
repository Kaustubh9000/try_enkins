import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://[2402:e280:3e22:4a1:e146:d9cf:a96b:713e]:9000/quotes/";

function Home() {
    const [allQuotes, setAllQuotes] = useState([]);
    var [errMsg, setErrMsg] = useState({ message: "", displayErr: "d-none" });

    useEffect(() => {
        loadAllQuotes();
    }, []);
    
    var fav;

    const likeUnlick = (qid, isfav, quid) => {
        console.log("isfav = " + isfav);
        if (isfav === 1) {
            fav = 0;
        } else {
            fav = 1;
        }
        axios
            .post(`${baseUrl}like`, {
                uid: sessionStorage.getItem("uid"),
                quid: quid,
                qid: qid,
                isfav: fav,
            })
            .then((response) => {
                if (response.data.error !== undefined) {
                    setErrMsg({ message: "Cannot Like Your Own Quotes !", displayErr: "d-block" });
                } else {
                    setErrMsg({ message: "", displayErr: "d-none" });
                    if(sessionStorage.getItem("loadFav") === "false"){
                        loadAllQuotes();
                    }
                    else{
                        loadFavQuotes();
                    }
                }
            });
    };

    const loadAllQuotes = () => {
        sessionStorage.setItem("loadFav", false);
        axios
            .post(`${baseUrl}all`, { uid: sessionStorage.getItem("uid") })
            .then((response) => {
                if (response.data.error !== undefined) {
                } else {
                    setAllQuotes(response.data);
                }
            });
    };

    const likeButton = (isLiked) => {
        if (isLiked === 1) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="Red"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                </svg>
            );
        } else {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
            );
        }
    };

    const loadFavQuotes = () => {
        sessionStorage.setItem("loadFav", true);
        debugger;
        axios
            .post(`${baseUrl}fav`, { uid: sessionStorage.getItem("uid") })
            .then((response) => {
                if (response.data.error !== undefined) {
                    setAllQuotes([]);
                } else {
                    setAllQuotes(response.data);
                }
            });
    };

    return (
        <div className="container">
            <div className="align-items-center m-auto col-md-8">
                <h1 className="text-center"> Quotes around the world</h1>
                <div className="row text-end">
                    <button
                        className="btn btn-light col-2 p-2"
                        onClick={loadAllQuotes}
                    >
                        All
                    </button>
                    <button
                        className="btn btn-light col-2 p-2 mx-2"
                        onClick={loadFavQuotes}
                    >
                        Favorites
                    </button>
                </div>
                <div className={"alert alert-danger " + errMsg.displayErr}>
                    {errMsg.message}
                </div>
                <div className="">
                    {allQuotes.map((quote) => {
                        return (
                            <div className="card p-3 m-3 row" key={quote.qid}>
                                <div className="col-8">{quote.quote}</div>
                                <div> - {quote.author}</div>
                                <div>
                                <button className="btn btn-light float-end" onClick={() => {
                                        likeUnlick( quote.qid, quote.is_liked, quote.added_by );}}>
                                    {likeButton(quote.is_liked, quote.qid, quote.is_liked, quote.added_by )}
                                    {"  "+quote.likes}
                                </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default Home;
