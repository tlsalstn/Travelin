import React from 'react';
import './SearchBox.scss';
import { observer, inject } from 'mobx-react';
import Rsltsrch from '../Rsltsrch/Rsltsrch';

interface Props {
    store?: any;
    isShow: boolean;
}

interface State {
    rsltOrInfo: boolean;
}

@inject("store")
@observer
class SearchBox extends React.Component<Props, State> {
    componentDidMount() {
        // const { setSearchBox } = this.props.store.mapStore;
        // const container = document.getElementById("searchBox");

        // setSearchBox(container);
    }

    render() {
        const { isShow } = this.props;
        const { value, handleChange, search } = this.props.store.searchStore;
        const { addMarker } = this.props.store.mapStore;

        const handleKeyUp = (e: any) => {
            if(e.keyCode === 13) handleClick();
        }

        const handleClick = async () => {
            const result = await search();
            result !== undefined ? addMarker(result.geometry.location.lat, result.geometry.location.lng) : alert("No results");
        }

        return (
            <div className="SearchBox" style={isShow ? {display: "block"} : {display: "none"}}>
                <div className="SearchBox-Input">
                    <input id="searchBox" type="text" placeholder="검색" onChange={e => handleChange(e)} value={value} onKeyUp={e => handleKeyUp(e)} />
                    <button onClick={() => handleClick()}>
                        <img src={"https://img.icons8.com/ios-glyphs/60/000000/search.png"} alt="search" />
                    </button>
                </div>
                {/* <Rsltsrch /> */}
            </div>
        );
    }
}

export default SearchBox;