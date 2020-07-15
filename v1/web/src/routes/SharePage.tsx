import React from "react";
import ShareContainer from "../containers/ShareContainer/Index/ShareContainer";
import ShareCreateContainer from "../containers/ShareContainer/Create/CreateContainer";
import ShareInfoContainer from "../containers/ShareContainer/Info/InfoContainer";

export class SharePage extends React.Component {
    render() {
        return (
            <ShareContainer />
        );
    }
}

export class ShareCreatePage extends React.Component {
    render() {
        return (
            <ShareCreateContainer />
        );
    }
}

export class ShareInfoPage extends React.Component {
    render() {
        return (
            <ShareInfoContainer />
        )
    }
}