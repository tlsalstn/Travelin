import React from "react";
import "./PostNav.scss";
import { Link } from "react-router-dom";

const PostNav: React.SFC = () => {
    const type = window.location.href.split("/post/")[1];
    console.log(type);
    return (
        <div className="PostNav">
            <div className="PostNav-Menu">
                <ul>
                    <li>
                        <Link to="/post/notice">Notice</Link>
                    </li>
                    <li>
                        <Link to="/post/share">Share</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PostNav;