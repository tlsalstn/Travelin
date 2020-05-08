import { observable, action } from 'mobx';
import axios from 'axios';
import { address } from '../config/Adrs.json';
import { token } from '../config/token.json';

class Weather {
    @observable result = [];

    @action getWeatherInfo = async () => {
        console.log("1");
        try{
            const result = await axios({
                url: address.weather,
                method: "GET",
                headers: {
                    "serviceKey": token.weather
                }
            });
    
            console.log(result);
        } catch(error) {
            console.log(error);
        }
    }
}

export default new Weather();