import React from "react";
import "./AuthContainer.scss";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import { inject, observer } from "mobx-react";

interface Props {
    store?: any;
}

@inject('store')
@observer
class LoginContainer extends React.Component<Props> {
    UNSAFE_componentWillMount() {
        if(localStorage.getItem("token")) {
            window.location.href = "/";
        }
    }
    
    render() {
        const url = window.location.href;
        const type = url.split("/")[4];
        const { loginStore, registerStore } = this.props.store;

        return (
            <div className="AuthContainer">
                {type === "login" ? <Login id={loginStore.values.id} password={loginStore.values.password} handleChange={loginStore.inputChange} login={loginStore.login} /> : <Register id={registerStore.values.id} password={registerStore.values.password} name={registerStore.values.name} nickName={registerStore.values.nickName} email={registerStore.values.email} handleChange={registerStore.inputChange} register={registerStore.register} />}
            </div>
        );
    }
}

export default LoginContainer;