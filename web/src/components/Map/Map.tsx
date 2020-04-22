import React from 'react';
import './Map.scss';

declare global {
    interface Window {
        kakao: any
    }
}

interface Props {

}

interface State {
    map: any
}

class Map extends React.Component<Props, State> {
    state: State = {
        map: null
    }

    componentDidMount() {
        // const script = document.createElement("script");
        // script.async = true;
        // script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=0057cb2434d4fcc5cc94e23b884ea30e";
        // document.head.appendChild(script);

        window.kakao.maps.load(() => {
            let container = document.getElementById("map");
            let options = {
                center: new window.kakao.maps.LatLng(35.6632508239323, 128.413618885714),
                level: 3
            };
            let map = new window.kakao.maps.Map(container, options);

            this.setState({
                map: map
            });
        });
    }

    render() {
        return (
            <div id="map" />
        );
    }
}

export default Map;