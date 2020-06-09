import React from 'react';
import './MapContainer.scss';
import Menu from '../../components/Menu/Menu';
import Map from '../../components/Map/Map';

class MapContainer extends React.Component {
    render() {
        return (
            <div className="MainContainer">
                <Menu />
                <Map />
            </div>
        );
    }
}

export default MapContainer;