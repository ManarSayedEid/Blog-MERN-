import axios from "axios";

export const register = ({ username, email, password, gender }) => async (
  dispatch
) => {
  const body = { username, email, password, gender };
  try {
    const res = await axios.post("api/users/register", body);
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map((error) => alert(error.msg));

    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};
