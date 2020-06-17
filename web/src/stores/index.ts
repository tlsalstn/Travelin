import { MapStore } from './Map';
import { WeatherStore } from './Weather';
import { SearchStore } from './Search';
import { LoginStore, RegisterStore } from "./Auth";
import { PostStore } from "./Posts";

const mapStore = new MapStore();
const weatherStore = new WeatherStore();
const searchStore = new SearchStore();
const loginStore = new LoginStore();
const registerStore = new RegisterStore();
const postStore = new PostStore();

export default { mapStore, weatherStore, searchStore, loginStore, registerStore, postStore };