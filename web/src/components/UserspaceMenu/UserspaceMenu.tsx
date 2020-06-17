import React from "react";
import { Link } from "react-router-dom";

const UserspaceMenu: React.SFC = () => {
    const logout = () => {
        window.localStorage.clear();
    }

    return (
        <ul>
            <li>
                <Link to="/">MY PAGE</Link>
            </li>
            <li>
                <Link to="/" onClick={() => logout()}>LOGOUT</Link>
            </li>
        </ul>
    );
}

export default UserspaceMenu;