import axios from "axios";

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
    alert("profile deleted");
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
