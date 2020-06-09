import { observable, action } from "mobx";
import { ChangeEvent } from "react";
import Axios from "axios";
import { address } from "../config/adrs.json";
import { token } from "../config/token.json";

declare global {
    interface Window {
        google: any;
    }
}

interface Map {
    fitBounds?: any;
    controls?: any;
    addListener?: any;
    getBounds?: any;
}

interface Waypoints {
    location: string;
    latlng: string;
};

export class MapStore {
    @observable map: Map = {};
    @observable points: Waypoints[] = [
        {
            location: "",
            latlng: ""
        },
        {
            location: "",
            latlng: ""
        }
    ];

    initPoint: Waypoints = {
        location: "",
        latlng: ""
    }

    setMap = (map: Map) => this.map = map;

    // 맵 생성
    @action initMap = async (container: object) => {
        window.onload = () => {
            const center = { lat: 35.663232, lng: 128.413708 };
            const option = {
                zoom: 10,
                center: center
            }

            const map = new window.google.maps.Map(container, option);

            this.setMap(map);
        }
    }

    // 길 생성
    @action directions =  async(travelMode: string) => {
        this.points.map((item, key) => this.getLocation(key, item.location));

        if(this.points.length > 2) {
            const test = this.points.slice(1, this.points.length - 1).map(item => {
                return {
                    location: item.location
                }
            });
            console.log(test);
            console.log(this.points);
        }

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        directionsService.route({
            origin: this.points[0].location,
            destination: this.points[this.points.length - 1].location,
            waypoints: this.points.slice(1, this.points.length - 1).map(item => {
                return {
                    location: item.location
                }
            }),
            travelMode: window.google.maps.DirectionsTravelMode.DRIVING
        }, (response: object, status: string): void => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                alert("Cannot directions");
            }
        });
    }

    @action addInput = () => {
        this.points.push(this.initPoint);
    }

    @action removeInput = (id: number) => {
        if(this.points.length <= 2) {
            this.points[id].location = "";
            return;
        }
        this.points.splice(id, 1);
    }

    @action changeInput = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        this.points[id].location = e.target.value;
    }

    getLocation = async (id: number, input: string) => {
        try {
            const result: any = await Axios({
                method: "GET",
                url: address.localhost + "/places/findPlace",
                params: {
                    key: token.ip,
                    input: input,
                    inputtype: "textquery",
                    fields: "geometry"
                }
            });

            console.log(result);

            if(result.data.status !== 200) {
                return false;
            }

            console.log(result.data.geometry.location.lat + ', ' + result.data.geometry.location.lng);

            this.points[id].latlng = result.data.geometry.location.lat + ", " + result.data.geometry.location.lng;
        } catch (error) {
            console.log(error);
        }
    }
}