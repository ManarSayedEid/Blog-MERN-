import { combineReducers } from "redux";

import Auth from "./auth";
import profile from "./profile";

export default combineReducers({
  Auth,
  profile,
});
