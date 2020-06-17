import React from 'react';
import './Map.scss';
import { inject, observer } from 'mobx-react';

declare global {
    interface Window {
        google: any
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
    async componentDidMount() {
        const { initMap } = this.props.store.mapStore;
        const container = document.getElementById("map");

        initMap(container);
    }

    render() {
        return (
            <div id="map" />
        );
    }
}

export default Map;