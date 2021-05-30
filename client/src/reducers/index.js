import { combineReducers } from "redux";

import Auth from "./auth";
import profile from "./profile";
import post from "./post";

export default combineReducers({
  Auth,
  profile,
  post,
});
