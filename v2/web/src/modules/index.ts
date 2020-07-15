import { combineReducers } from "redux";
import post from "./post";

const rootReducer = combineReducers({
    // Enter Here Reducers
    post
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;