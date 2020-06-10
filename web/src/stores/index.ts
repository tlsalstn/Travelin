import { MapStore } from './Map';
import { WeatherStore } from './Weather';
import { SearchStore } from './Search';
import { LoginStore, RegisterStore } from "./Auth";

const mapStore = new MapStore();
const weatherStore = new WeatherStore();
const searchStore = new SearchStore();
const loginStore = new LoginStore();
const registerStore = new RegisterStore();

export default { mapStore, weatherStore, searchStore, loginStore, registerStore };