import React from 'react';
import './SearchBox.scss';
import { observer, inject } from 'mobx-react';
import ResultBox from '../ResultBox/ResultBox';

interface Props {
    store?: any;
    isShow: boolean;
}

interface State {
    data: Place;
}

interface Place {
    name: string;
    place_id: string;
    rating: number;
    website: string;
    formatted_address: string;
    international_phone_number: string;
    types: string[];
    geometry: {
        location: {
            lat: number;
            lng: number;
        }
    };
}

@inject("store")
@observer
class SearchBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: {
                name: "",
                place_id: "",
                rating: 0.0,
                website: "",
                formatted_address: "",
                international_phone_number: "",
                types: [],
                geometry: {
                    location: {
                        lat: 0,
                        lng: 0
                    }
                }
            }
        };
    }
    
    render() {
        const { isShow } = this.props;
        const { placeInfo, value, handleChange, search } = this.props.store.searchStore;
        const { weather, getWeather } = this.props.store.weatherStore;
        const { addMarker } = this.props.store.mapStore;

        const handleKeyUp = (e: any) => {
            if (e.keyCode === 13) handleClick();
        }

        const handleClick = async () => {
            const result = await search();
            if(result.status === undefined) {
                addMarker(result.geometry.location.lat, result.geometry.location.lng, result.formatted_address, 10 + result.address_components.length);
                getWeather(result.formatted_address);
            } else {
                alert("No result");
            }
        }

        return (
            <div className="SearchBox" style={isShow ? { display: "block" } : { display: "none" }}>
                <div className="SearchBox-Input">
                    <input type="text" placeholder="Search" onChange={e => handleChange(e)} value={value} onKeyUp={e => handleKeyUp(e)} />
                    <button onClick={() => handleClick()}>
                        <img src={"https://img.icons8.com/ios-glyphs/60/000000/search.png"} alt="search" />
                    </button>
                </div>
                <ResultBox place={placeInfo} weather={weather} />
            </div>
        );
    }
}

export default SearchBox;