import { observable, action } from "mobx";
import { ChangeEvent } from "react";

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
    panTo?: any;
}

interface Waypoints {
    location: string;
};

export class MapStore {
    @observable map: Map = {};
    @observable points: Waypoints[] = [
        {
            location: ""
        },
        {
            location: ""
        }
    ];

    initPoint: Waypoints = {
        location: ""
    }

    setMap = (map: Map) => this.map = map;
    @action getMap = () => {
        console.log(this.map);
        return this.map;
    }

    directionsService: any;
    directionsRenderer: any;
    marker: any;

    @action load = async (container: object, travelMode: string, points: Waypoints[]) => {
        console.log(points);
        window.onload = () => {
            const center = { lat: 35.663232, lng: 128.413708 };
            const option = {
                zoom: 10,
                center: center,
                mapTypeControl: false
            }

            const map = new window.google.maps.Map(container, option);

            this.setMap(map);

            this.directionsService = new window.google.maps.DirectionsService();
            this.directionsRenderer = new window.google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(this.map);

            this.directionsService.route({
                origin: points[0].location,
                destination: points[this.points.length - 1].location,
                waypoints: points.slice(1, this.points.length - 1).map(item => {
                    return {
                        location: item.location
                    }
                }),
                travelMode: travelMode
            }, (response: object, status: string): void => {
                console.log(response);
                if (status === "OK") {
                    this.directionsRenderer.setDirections(response);
                } else {
                    alert("No way found");
                }
            });
        }
    }

    // 맵 생성
    @action initMap = (container: object) => {
        window.onload = () => {
            const center = { lat: 35.663232, lng: 128.413708 };
            const option = {
                zoom: 10,
                center: center,
                mapTypeControl: false
            }

            const map = new window.google.maps.Map(container, option);

            this.setMap(map);

            this.directionsService = new window.google.maps.DirectionsService();
            this.directionsRenderer = new window.google.maps.DirectionsRenderer();
            this.directionsRenderer.setMap(this.map);
        }
    }

    @action moveTo = (lat: number, lng: number) => {
        this.map.panTo(new window.google.maps.LatLng(lat, lng));
    }

    @action addMarker = (lat: number, lng: number) => {
        this.moveTo(lat, lng);

        if (this.marker) this.marker.setMap(null);

        this.marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            title: "Marker"
        });
    }

    // 길 생성
    @action directions = async (travelMode: string, points: Waypoints[] = this.points) => {
        // this.directionsRenderer.setMap(this.map);
        this.directionsService.route({
            origin: points[0].location,
            destination: points[this.points.length - 1].location,
            waypoints: points.slice(1, this.points.length - 1).map(item => {
                return {
                    location: item.location
                }
            }),
            travelMode: travelMode
        }, (response: object, status: string): void => {
            console.log(response);
            if (status === "OK") {
                this.directionsRenderer.setDirections(response);
            } else {
                alert("No way found");
            }
        });
    }

    @action addInput = () => {
        this.points.push(this.initPoint);
    }

    @action removeInput = (id: number) => {
        if (this.points.length <= 2) {
            this.points[id].location = "";
            return;
        }
        this.points.splice(id, 1);
    }

    @action changeInput = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        this.points[id].location = e.target.value;
    }
}