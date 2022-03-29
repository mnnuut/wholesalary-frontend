import { combineReducers } from "redux";
import counterReducter from "./counterReducter";
import loginReducer from "./loginReducer";
import orderReducer from "./orderReducer";
import confirmOrderReducer from "./confirmOrderReducer";

const rootReducer = combineReducers({
  counter: counterReducter,
  login: loginReducer,
  order: orderReducer,
  confirm: confirmOrderReducer,
});

export default rootReducer;
