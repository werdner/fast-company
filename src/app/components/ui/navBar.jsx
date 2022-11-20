import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NavProfile } from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav mb-2">
                    <li className="nav-item">
                        <Link className="nav-link" to="/main">Main</Link>
                    </li>
                    {currentUser && (
                        <li>
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser
                        ? <NavProfile />
                        : <Link className="nav-link" to="/login">Login</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
