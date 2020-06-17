import React from "react";
import "./ShareContainer.scss";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

interface Props {
    store?: any;
}

interface State {

}

@inject("store")
@observer
class ShareContainer extends React.Component<Props, State> {
    componentDidMount() {
        const { getPost } = this.props.store.postStore;

        getPost();
    }

    render() {
        const { posts } = this.props.store.postStore;

        return (
            <div className="ShareContainer">
                <div className="ShareContainer-Nav">
                    <div className="ShareContainer-Nav-Title">
                        <Link to="/">Travelin</Link>
                        <a href="/post/create">Writing</a>
                    </div>
                </div>
                <div className="ShareContainer-List">
                    <div className="ShareContainer-List-Wrap">
                        <div className="ShareContainer-List-Wrap-Header">
                            <div className="ShareContainer-List-Wrap-Header-Number">No.</div>
                            <div className="ShareContainer-List-Wrap-Header-Title">Title</div>
                            <div className="ShareContainer-List-Wrap-Header-Author">Author</div>
                            <div className="ShareContainer-List-Wrap-Header-Created">Created</div>
                        </div>
                        {posts.map((item: any, key: number) => {
                            const time = item.created.split("T")[0];

                            return (
                                <div className="ShareContainer-List-Wrap-Content" key={key}>
                                    <div className="ShareContainer-List-Wrap-Content-Item">
                                        <div className="ShareContainer-List-Wrap-Content-Item-Number">{item.id}</div>
                                        <div className="ShareContainer-List-Wrap-Content-Item-Title">
                                            <a href={"/post/share/" + item.id}>{item.title}</a>
                                        </div>
                                        <div className="ShareContainer-List-Wrap-Content-Item-Author">{item.userId.name}</div>
                                        <div className="ShareContainer-List-Wrap-Content-Item-Created">{time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default ShareContainer;