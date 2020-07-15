import { observable, action } from 'mobx';
import Axios from 'axios';

export class WeatherStore {
    @observable weather = [];

    setData = (data: []) => this.weather = data;

    @action getWeather = async (q: string) => {
        try {
            const result = await Axios({
                method: "GET",
                url: "https://community-open-weather-map.p.rapidapi.com/weather",
                headers: {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": "70192c2743mshfa8350bd35a0a94p1d30f0jsn209d7455a07b"
                },
                params: {
                    q
                }
            });
            console.log(result);

            result.data.main.temp -= 273;
            result.data.main.temp_max -= 273;
            result.data.main.temp_min -= 273;
            result.data.main.feels_like -= 273;

            this.setData(result.data);
        } catch (error) {
            console.log(error);
            this.setData([]);
        }
    }
}