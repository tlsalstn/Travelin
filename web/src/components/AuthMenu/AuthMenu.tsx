import React from "react";

const AuthMenu: React.SFC = () => (
    <ul>
        <li>
            <a href="/auth/login">LOGIN</a>
        </li>
        <li>
            <a href="/auth/register">SIGN UP</a>
        </li>
    </ul>
);

export default AuthMenu;