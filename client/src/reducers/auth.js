const initialState = {
  token: localStorage.getItem("token"),
  isLogged: null,
  user: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "USER_lOADED":
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogged: true,
        ...action.payload,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "USER_lOADING_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogged: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};

export default Auth;
