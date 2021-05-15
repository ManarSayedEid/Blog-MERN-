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
    console.log(error.response.data);
    dispatch({
      type: "PROFILE_FAILED",
    });
  }
};
