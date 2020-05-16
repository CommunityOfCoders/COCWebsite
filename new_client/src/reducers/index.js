import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  blog: blogReducer,
});

export default rootReducer;

