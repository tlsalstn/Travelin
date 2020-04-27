import { observable, action } from "mobx";

declare global {
    interface Window {
        kakao: any;
    }
}

interface Map {
    panTo?: any;
    setLevel?: any;
}

interface Markers {

}

class MapStore {
    @observable map: Map = {};
    @observable markers: Array<Markers> = [];

    @action setMap = (map: any) => {
        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            console.log(latlng.toString());
        })
        this.map = map;
    }

    @action setLocation = (latlng: [number, number]) => {
        console.log(latlng);
        let position = new window.kakao.maps.LatLng(latlng[0], latlng[1]);
        this.map.panTo(position);
        this.map.setLevel(3, {animate: true});
        this.addMarker(position);
    }

    @action addMarker = (position: [number, number]) => {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: position
        });
        console.log(marker);
        this.markers.push(marker);
    }
}

export default new MapStore();