import axios from "axios";

import { getProfile } from "./profile";

export const UserLoaded = () => async (dispatch) => {
  try {
    const res = await axios.get("api/auth", {
      headers: {
        authorization: localStorage.token,
      },
    });

    console.log(res.data);

    dispatch({
      type: "USER_lOADED",
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response.data);
    // alert(error.response.data.msg);
    dispatch({
      type: "USER_lOADING_FAILED",
    });
  }
};

export const register =
  ({ username, email, password, gender }) =>
  async (dispatch) => {
    const body = { username, email, password, gender };
    try {
      const res = await axios.post("api/users/register", body);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      alert("registered successfully");
      console.log(res.data);

      // after getting token -> get the user profile
      dispatch(UserLoaded());
      dispatch(getProfile());
    } catch (error) {
      console.log(error.response.data);
      const errors = error.response.data.errors;
      errors.forEach((error) => alert(error.msg));

      dispatch({
        type: "REGISTER_FAIL",
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = { email, password };
    try {
      const res = await axios.post("api/auth/login", body);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      alert("log in successfully");
      console.log(res.data);
      // after getting token -> get the user profile
      dispatch(UserLoaded());
      dispatch(getProfile());
    } catch (error) {
      console.log(error.response.data);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      } else {
        console.log(error.response.statusText);
        alert(error.response.statusText);
      }

      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
