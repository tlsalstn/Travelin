import { MapStore } from './Map';
import { WeatherStore } from './Weather';
import { LoginStore, RegisterStore } from "./Auth";

const mapStore = new MapStore();
const weatherStore = new WeatherStore();
const loginStore = new LoginStore();
const registerStore = new RegisterStore();

export default { mapStore, weatherStore, loginStore, registerStore }