import React from 'react';
import './Map.scss';
import { inject, observer } from 'mobx-react';

declare global {
    interface Window {
        kakao: any
    }
}

interface Props {
    store?: any;
}

interface State {

}

@inject("store")
@observer
class Map extends React.Component<Props, State> {
    componentDidMount() {
        const { setMap } = this.props.store.MapStore;

        window.kakao.maps.load(() => {
            let container = document.getElementById("map");
            let lat: number = 35.6632508239323;
            let lng: number = 128.413618885714;

            let options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3
            };

            setMap(new window.kakao.maps.Map(container, options));
        });
    }

    render() {
        return (
            <div id="map" />
        );
    }
}

export default Map;