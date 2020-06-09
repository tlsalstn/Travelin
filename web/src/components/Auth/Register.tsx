import React, { ChangeEvent } from "react";
import "./Auth.scss";

interface Props {
    id: string;
    password: string;
    name: string;
    nickName: string;
    email: string;
    handleChange(type: string, e: ChangeEvent<HTMLInputElement>): void;
    register(): any;
}

const Register: React.SFC<Props> = ({ id, password, name, nickName, email, handleChange, register }) => {
    const handleClick = async () => {
        const data = await register();

        if(data.status === 200) {
            alert("User creaeted");
            window.location.href = "/auth/login";
        } else {
            alert(data.message);
        }
    }

    return (
        <div className="Form">
            <div className="Form-Content">
                <div className="Form-Content-Title">
                    <a href="/">SIGN UP</a>
                </div>
                <input type="text" value={id} onChange={e => handleChange("id", e)} placeholder="ID" />
                <input type="password" value={password} onChange={e => handleChange("password", e)} placeholder="PASSWORD" />
                <input type="text" value={name} onChange={e => handleChange("name", e)} placeholder="NAME" />
                <button onClick={() => handleClick()}>Create Account</button>
            </div>
        </div>
    );
}

export default Register;