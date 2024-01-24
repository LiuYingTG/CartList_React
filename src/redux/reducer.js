import {combineReducers} from "redux";
//引入为cart服务的reducer
import cartReducer from "./reducers/cart";
//整合为一个reducer
export default combineReducers({cartReducer})
