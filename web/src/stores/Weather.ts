import { observable, action } from 'mobx';
// import axios from 'axios';
// import { address } from '../config/adrs.json';
// import { token } from '../config/token.json';

export class WeatherStore {
    @observable result = [];

    // 공공데이터 날씨 예보 얻기
    @action getWeatherInfo = async () => {
        const nxny = await this.transformLatlngToGrid("toXY", 35.6632508239323, 128.413618885714);
        console.log(nxny);
        try {
            // const result = await axios({
            //     url: address.weather,
            //     method: "GET",
            //     params: {
            //         serviceKey: token.weather,
            //         pageNo: 1,
            //         base_date: this.getDate(),
            //         base_time: '0030',
            //         nx: nxny["x"],
            //         ny: nxny["y"]
            //     }
            // });

            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    // 날짜 포멧
    getDate = (): String => {
        let date = new Date();
        let formattedDate = '';
        formattedDate += date.getFullYear();
        if (date.getMonth() + 1 > 9) {
            formattedDate += date.getMonth() + 1;
        } else {
            formattedDate += '0' + (date.getMonth() + 1);
        }
        formattedDate += date.getDate();

        return formattedDate;
    }

    // 위경도 <-> 기상청 격자
    transformLatlngToGrid = (code: String, v1: any, v2: any) => {
        console.log(code, v1, v2);
        const RE = 6371.00877; // 지구 반경(km)
        const GRID = 5.0; // 격자 간격(km)
        const SLAT1 = 30.0; // 투영 위도1(degree)
        const SLAT2 = 60.0; // 투영 위도2(degree)
        const OLON = 126.0; // 기준점 경도(degree)
        const OLAT = 38.0; // 기준점 위도(degree)
        const XO = 43; // 기준점 X좌표(GRID)
        const YO = 136; // 기준점 Y좌표(GRID)

        const DEGRAD = Math.PI / 180.0;
        const RADDEG = 180.0 / Math.PI;

        const re = RE / GRID;
        const slat1 = SLAT1 * DEGRAD;
        const slat2 = SLAT2 * DEGRAD;
        const olon = OLON * DEGRAD;
        const olat = OLAT * DEGRAD;

        let sn =
            Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
            Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
        let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = (re * sf) / Math.pow(ro, sn);
        const rs: any = {};
        let ra = 0;
        let theta = 0;
        if (code === "toXY") {
            rs["lat"] = v1;
            rs["lng"] = v2;
            ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
            ra = (re * sf) / Math.pow(ra, sn);
            theta = v2 * DEGRAD - olon;
            if (theta > Math.PI) theta -= 2.0 * Math.PI;
            if (theta < -Math.PI) theta += 2.0 * Math.PI;
            theta *= sn;
            rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
            rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
        } else {
            rs["x"] = v1;
            rs["y"] = v2;
            const xn = v1 - XO;
            const yn = ro - v2 + YO;
            ra = Math.sqrt(xn * xn + yn * yn);
            if (sn < 0.0) --ra;
            let alat = Math.pow((re * sf) / ra, 1.0 / sn);
            alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

            if (Math.abs(xn) <= 0.0) {
                theta = 0.0;
            } else {
                if (Math.abs(yn) <= 0.0) {
                    theta = Math.PI * 0.5;
                    if (xn < 0.0) --theta;
                } else theta = Math.atan2(xn, yn);
            }
            const alon = theta / sn + olon;
            rs["lat"] = alat * RADDEG;
            rs["lng"] = alon * RADDEG;
        }
        return rs;
    }
}