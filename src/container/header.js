import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

function Header() {
    const nav=useNavigate()
    // const [dropdown, setDropdown] = useState(false);
     const logout=()=>{
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("uid");
        nav("/login");
     }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse row px-3" id="collapsibleNavId">
                    <div className="col">
                        <ul className="navbar-nav mt-2 mt-lg-0">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/myquotes">
                                My Quotes
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>
                    </ul>
                    </div>
                    <div className="col-1">
                        <ul className="navbar-nav mt-2 mt-lg-0 ">
                    <li className="nav-item">
                            <Link className="nav-link" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;