import React from "react";
import "./InfoContainer.scss";
import { inject, observer } from "mobx-react";

interface Props {
    store?: any;
}

interface State {

}

@inject("store")
@observer
class InfoContainer extends React.Component<Props, State> {
    async componentDidMount() {
        const { getPost } = this.props.store.postStore;
        const { load } = this.props.store.mapStore;

        const id = window.location.href.split("/share/")[1];
        const container = document.getElementById("map1");

        const post = await getPost(id);
        const mapInfo = JSON.parse(post.points);
        load(container, mapInfo.travelMode, mapInfo.points);
    }

    render() {
        const { post } = this.props.store.postStore;

        return (
            <div className="InfoContainer">
                <div className="InfoContainer-Wrap">
                    <div className="InfoContainer-Wrap-Title">
                        <div className="InfoContainer-Wrap-Title-Main">
                            {post.title}
                        </div>
                        <div className="InfoContainer-Wrap-Title-Sub">
                            Author: {post.userId.name}
                        </div>
                    </div>
                    <div id="map1" className="InfoContainer-Wrap-Map" />
                    <div className="InfoContainer-Wrap-Content">
                        {post.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoContainer;