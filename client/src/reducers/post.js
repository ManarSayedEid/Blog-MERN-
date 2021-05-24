const initialState = {
  posts: [],
  post: null,
};

const post = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: payload,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case "LIKE_STATUS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };

    case "POSTS_ERROR":
      return {
        ...state,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    default:
      return state;
  }
};

export default post;
