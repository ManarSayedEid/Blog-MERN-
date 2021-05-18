const initial_state = {
  profile: null,
};

const profile = (state = initial_state, action) => {
  switch (action.type) {
    case "PROFILE_LOADED":
      return {
        ...state,
        profile: action.payload,
      };
    case "DELETE_PROFILE":
      return {
        profile: null,
      };

    case "PROFILE_FAILED":
    case "LOGOUT":
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

export default profile;
