import axios from "axios";
import { UserLoaded } from "./auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me", {
      headers: {
        authorization: localStorage.token,
      },
    });

    console.log(res.data);
    dispatch({
      type: "PROFILE_LOADED",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "PROFILE_FAILED",
    });
  }
};

export const updateProfile = (body) => async (dispatch) => {
  try {
    // const body = { bio, facebook, linkedin, github };
    const res = await axios.post("api/profile", body, {
      headers: {
        authorization: localStorage.token,
      },
    });

    console.log(res.data);
    dispatch({
      type: "PROFILE_LOADED",
      payload: res.data,
    });
    toast.success("profile updated successfully");
  } catch (error) {
    console.log(error);

    dispatch({
      type: "PROFILE_FAILED",
    });
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    await axios.delete("/api/profile", {
      headers: {
        authorization: localStorage.token,
      },
    });
    // console.log(res.data);
    dispatch({
      type: "DELETE_PROFILE",
    });

    toast.info("profile deleted");
    dispatch({
      type: "LOGOUT",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "DELETE_PROFILE_FAILED",
    });
  }
};

export const uploadImg = (formData) => async (dispatch) => {
  fetch("api/users/img", {
    method: "POST",
    body: formData,
    headers: {
      authorization: localStorage.token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log("Success:", res);
      dispatch({
        type: "IMG_LOADED",
        payload: res.data,
      });
      dispatch(UserLoaded());

      toast.success("Image updated successfully");
    })
    .catch((error) => {
      console.log(error);

      toast.error("Image upload failed, Please try again");
    });
};

export const getProfiles = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    console.log(res.data);
    dispatch({
      type: "GET_PROFILES",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "PROFILE_FAILED",
    });
  }
};
