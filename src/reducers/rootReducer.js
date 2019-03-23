import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import ridesReducer from "./ridesReducer";

export default combineReducers({
  loginReducer,
  ridesReducer
});
