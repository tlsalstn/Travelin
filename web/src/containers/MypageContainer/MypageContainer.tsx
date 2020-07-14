import React from 'react';
import "./MypageContainer.scss";
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface Props {
    store?: any;
}

interface State {

}

@inject("store")
@observer
class MypageContainer extends React.Component<Props, State> {
    componentDidMount() {
        const { getInfo } = this.props.store.infoStore;
        const { getMyPosts } = this.props.store.postStore;
        getInfo();
        getMyPosts();
    }
    render() {
        const { info } = this.props.store.infoStore;
        const { posts, remove } = this.props.store.postStore;

        return (
            <div className="MypageContainer">
                <div className="MypageContainer-Wrap">
                    <div className="MypageContainer-Wrap-User Box">
                        <h1>Infomation</h1>
                        <div className="MypageContainer-Wrap-User-Id">
                            <span>ID: {info.userId}</span>
                        </div>
                        <div className="MypageContainer-Wrap-User-Name">
                            <span>Name: {info.name}</span>
                        </div>
                    </div>
                    <div className="MypageContainer-Wrap-Posts Box">
                        <p className="MypageContainer-Wrap-Posts-Title">My posts</p>
                        {posts.length > 0 ? posts.map((item: any, key: number) => {
                            const time = item.created.split("T")[0];

                            return (
                                <div className="MypageContainer-Wrap-Posts-Content" key={key}>
                                    <div className="MypageContainer-Wrap-Posts-Content-Item">
                                        <div className="MypageContainer-Wrap-Posts-Content-Item-Number">{item.id}</div>
                                        <div className="MypageContainer-Wrap-Posts-Content-Item-Title">
                                            <Link to={"/post/share/" + item.id}>{item.title}</Link>
                                        </div>
                                        <div className="MypageContainer-Wrap-Posts-Content-Item-Created">{time}</div>
                                        <div className="MypageContainer-Wrap-Posts-Content-Item-Btn">
                                            <button onClick={() => remove(item.id)}>
                                                <img src={"https://img.icons8.com/material-rounded/24/000000/delete-forever.png"} alt="delete"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }): <p style={{textAlign: "center", padding: "20px 0"}}>No posts</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default MypageContainer;