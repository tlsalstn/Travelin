import React from 'react';
import './MainContainer.scss';
import Menu from '../../components/Menu/Menu';
import Map from '../../components/Map/Map';

class MainContainer extends React.Component {
    render() {
        return (
            <div className="MainContainer">
                <Menu />
                <Map />
            </div>
        );
    }
}

export default MainContainer;