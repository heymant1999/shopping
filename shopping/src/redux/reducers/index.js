import { combineReducers } from "redux";
import { productReducer } from './reducers';

export const reducers = combineReducers({
     allReducers:productReducer
})