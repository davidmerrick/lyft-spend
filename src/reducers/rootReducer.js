import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import ridesReducer from "./ridesReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  loginReducer,
  ridesReducer,
  dashboardReducer
});
