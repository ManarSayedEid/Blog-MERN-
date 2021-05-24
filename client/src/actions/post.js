import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    console.log(res.data);
    dispatch({
      type: "GET_POSTS",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POSTS_ERROR",
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/posts/" + id);
    // console.log(res.data);
    dispatch({
      type: "DELETE_POST",
      payload: id,
    });
    toast.warn("post deleted");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POSTS_ERROR",
    });
  }
};

export const addPost = (body) => async (dispatch) => {
  try {
    const res = await axios.post("api/posts", body, {
      headers: {
        authorization: localStorage.token,
      },
    });
    // console.log(res.data);
    dispatch({
      type: "ADD_POST",
      payload: res.data,
    });
    toast.success("post added");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POSTS_ERROR",
    });
  }
};

export const toggleLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/likes/${postId}`,
      {},
      {
        headers: {
          authorization: localStorage.token,
        },
      }
    );
    console.log(res.data);
    dispatch({
      type: "LIKE_STATUS",
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "POSTS_ERROR",
    });
  }
};
