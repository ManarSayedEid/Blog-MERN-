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
    alert("registered successfully");
    console.log(res.data);
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => alert(error.msg));

    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};
