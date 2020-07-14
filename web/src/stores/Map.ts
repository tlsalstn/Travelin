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
    setZoom?: any;
}

interface Center {
    lat: number;
    lng: number;
}

interface Option {
    zoom: number;
    center: Center;
    mapTypeControl: boolean;
}

interface Waypoints {
    location: string;
};

export class MapStore {
    directionsService: any;
    directionsRenderer: any;
    marker: any;
    defaultCenter: Center = { lat: 35.663232, lng: 128.413708 };
    defaultOptions: Option = {
        zoom: 10,
        center: this.defaultCenter,
        mapTypeControl: false
    }

    @observable map: Map = {};
    @observable points: Waypoints[] = [
        {
            location: ""
        },
        {
            location: ""
        }
    ];

    // 경유지 추가 버튼 클릭 시 points에 추가
    initPoint: Waypoints = {
        location: ""
    }

    // 맵 저장
    setMap = (map: Map) => this.map = map;

    // 길 생성 설정
    setDirections = () => {
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsRenderer = new window.google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(this.map);
    }

    createMap = (container: object) => {
        const map = new window.google.maps.Map(container, this.defaultOptions);

        this.setMap(map);
        this.setDirections();
    }

    // 맵 생성
    @action initMap = (container: object) => {
        if(document.readyState === "complete") {
            this.createMap(container);
        } else {
            window.onload = () => {
                this.createMap(container);
            }
        }
    }

    // 게시판에서 저장된 맵 불러오기
    @action load = async (container: object, travelMode: string, points: Waypoints[]) => {
        if(document.readyState === "complete") {
            this.createMap(container);
            this.directions(travelMode, points);
        } else {
            window.onload = () => {
                this.createMap(container);
                this.directions(travelMode, points);
            }
        }
    }

    // 지도 이동
    @action moveTo = (lat: number, lng: number) => {
        this.map.panTo(new window.google.maps.LatLng(lat, lng));
    }

    @action setZoom = (level: number) => {
        this.map.setZoom(level);
    }

    // 마커 추가
    @action addMarker = (lat: number, lng: number, title: string = "Marker", level: number) => {
        this.moveTo(lat, lng);
        this.setZoom(level);

        if (this.marker) this.marker.setMap(null);

        this.marker = new window.google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            title: title
        });
    }

    // 길 생성
    @action directions = async (travelMode: string, points: Waypoints[] = this.points): Promise<boolean> => {
        let isSuccess: boolean = false;
        let test = points;
        console.log(test);

        await this.directionsService.route({
            origin: points[0].location,
            destination: points[points.length - 1].location,
            waypoints: points.slice(1, points.length - 1).map(item => {
                return {
                    location: item.location
                }
            }),
            travelMode: travelMode
        }, (response: object, status: string) => {
            console.log(response);
            if (status === "OK") {
                this.directionsRenderer.setDirections(response);
                isSuccess = true;
            } else {
                alert("No way found");
                isSuccess = false;
            }
        });

        return isSuccess;
    }

    // 경유지 추가
    @action addInput = () => {
        this.points.push(this.initPoint);
    }

    // 경유지 삭제
    @action removeInput = (id: number) => {
        // 경유지가 2개 이하가 될 경우 값만 삭제
        if (this.points.length <= 2) {
            this.points[id].location = "";
            return;
        }
        this.points.splice(id, 1);
    }

    // 경유지 값 수정
    @action changeInput = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        this.points[id].location = e.target.value;
    }
}