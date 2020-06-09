import React from "react";

const UserspaceMenu: React.SFC = () => {
    const logout = () => {
        window.localStorage.clear();
    }

    return (
        <ul>
            <li>
                <a href="/">MY PAGE</a>
            </li>
            <li>
                <a href="/" onClick={() => logout()}>LOGOUT</a>
            </li>
        </ul>
    );
}

export default UserspaceMenu;