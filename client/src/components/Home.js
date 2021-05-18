import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "./spinner";
import { UserLoaded } from "../actions/auth";
import { getProfile } from "../actions/profile";
import { getPosts, deletePost, addPost } from "../actions/post";

import Moment from "react-moment";

const Home = ({
  UserLoaded,
  getProfile,
  getPosts,
  addPost,
  deletePost,
  posts: { posts },
  user,
  isLogged,
}) => {
  useEffect(() => {
    UserLoaded();
    getProfile();
    getPosts();
  }, [getPosts]);

  console.log(posts);
  console.log(user);
  console.log(isLogged);

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text });
    addPost({ text });
    setText("");
  };
  return (
    <div className="container">
      <div className="Posts">
        {!posts ? (
          <Spinner />
        ) : (
          <>
            <h1> Posts</h1>
            {isLogged && (
              <form onSubmit={handleSubmit}>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></input>
                <button>submit</button>
              </form>
            )}

            {posts.map((post) => {
              return (
                <div className="post" key={post._id}>
                  <h3>{post.name}</h3>
                  <small>
                    <Moment format="YYYY/MM/DD">{post.date}</Moment>
                  </small>
                  <p>{post.text}</p>
                  {user && user._id === post.user && (
                    <button onClick={() => deletePost(post._id)}>
                      delete post
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post,
  user: state.Auth.user,
  isLogged: state.Auth.isLogged,
});

export default connect(mapStateToProps, {
  deletePost,
  UserLoaded,
  getProfile,
  getPosts,
  addPost,
})(Home);
