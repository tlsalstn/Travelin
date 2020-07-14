import React from "react";
import "./MainContainer.scss";
import { Link } from "react-router-dom"
import AuthMenu from "../../components/AuthMenu/AuthMenu";
import UserspaceMenu from "../../components/UserspaceMenu/UserspaceMenu";

import Github from "../../img/github.png";

class MainContainer extends React.Component {
    render() {
        const token = localStorage.getItem("token");
        let isLogin: boolean = false;

        if (token) {
            isLogin = true;
        }

        return (
            <div className="MainContainer">
                <div className="MainContainer-Main">
                    <div className="MainContainer-Main-Nav">
                        <div className="MainContainer-Main-Nav-Title">
                            <Link to="/">Travelin</Link>
                        </div>
                        <div className="MainContainer-Main-Nav-Menu">
                            <ul>
                                <li>
                                    <a href="/map">MAP</a>
                                </li>
                                <li>
                                    <Link to="/post/share">COMMUNITY</Link>
                                </li>
                            </ul>
                            {isLogin ? <UserspaceMenu /> : <AuthMenu />}
                        </div>
                    </div>
                    <div className="MainContainer-Main-Bg">
                        <div className="MainContainer-Main-Bg-Container">
                            <div className="MainContainer-Main-Bg-Container-Content">
                                <div className="MainContainer-Main-Bg-Container-Content-Head">
                                    <p>Travel, More Easier</p>
                                </div>
                                <div className="MainContainer-Main-Bg-Container-Content-Body">
                                    <p>Share the route for trip you know.</p>
                                    <p>It will help others who don't know where to go.</p>
                                    <br />
                                    <p>Get the information here.</p>
                                    <p>It will help you where to go.</p>
                                </div>
                            </div>
                            <div className="MainContainer-Main-Bg-Container-Info">
                                <div className="MainContainer-Main-Bg-Container-Info-Link">
                                    <p>No Copyright</p>
                                </div>
                                <div className="MainContainer-Main-Bg-Container-Info-Link">
                                    <a href="https://github.com/QMCHE/Travelin" target="_blank" rel="noopener noreferrer"><img src={Github} alt="GitHub" title="GitHub" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;