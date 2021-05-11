const initialState = {
  token: localStorage.getItem("token"),
  isLogged: null,
  user: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogged: true,
        ...action.payload,
      };
    case "REGISTER_FAIL":
      localStorage.removeItem("token");

      return {
        ...state,
        isLogged: false,
        token: null,
      };

    default:
      return state;
  }
};

export default Auth;
