import React from 'react';
import './ResultBox.scss';

interface Props {
    place: Place;
    weather: Weather;
}

interface Place {
    name: string;
    place_id: string;
    rating: number;
    website: string;
    formatted_address: string;
    international_phone_number: string;
    types: string[];
}

interface Weather {
    main: Main;
    sys: Sys;
    weather: Info[];
    wind: Wind;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
}

interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
}

interface Info {
    description: string;
    main: string;
    icon: string;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

const ResultBox: React.SFC<Props> = ({ place, weather }) => {
    return (
        <div style={{ display: !place.name ? "none" : "block" }} className="ResultBox">
            <p className="ResultBox-Name">
                {place.name}
            </p>
            <p className="ResultBox-Address">
                {place.formatted_address}
            </p>
            <a className="ResultBox-Website" href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a>
            <hr/>
            <div className="ResultBox-Weather">
                <div className="ResultBox-Weather-Img">
                    {!weather.weather ? <p>No Weather Information</p> : <img src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} alt="Weather" />}
                </div>
                <div className="ResultBox-Weather-Info">
                    <p className="ResultBox-Weather-Info-Temp">{!weather.main ? "" : weather.main.temp.toFixed(0) + "℃"}</p>
                    <p className="ResultBox-Weather-Info-Weather">{!weather.weather ? "" : weather.weather[0].main}</p>
                </div>
            </div>
            <hr/>
        </div>
    );
}

ResultBox.defaultProps = {
    place: {
        name: "",
        place_id: "",
        rating: 0,
        website: "",
        formatted_address: "",
        international_phone_number: "",
        types: []
    },
    weather: {
        main: {
            temp: 0,
            feels_like: 0,
            temp_max: 0,
            temp_min: 0,
            pressure: 0
        },
        sys: {
            country: "",
            sunrise: 0,
            sunset: 0
        },
        weather: [
            {
                description: "",
                main: "",
                icon: ""
            }
        ],
        wind: {
            speed: 0,
            deg: 0,
            gust: 0
        }
    }
}

export default ResultBox;