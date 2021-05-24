import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UserLoaded } from "../actions/auth";
import { getProfile } from "../actions/profile";
import { getPosts, deletePost, addPost, toggleLike } from "../actions/post";
import defaultImg from "../img/defaultImg.jpg";
import Spinner from "./spinner";

import Moment from "react-moment";

const Home = ({
  UserLoaded,
  getProfile,
  getPosts,
  addPost,
  deletePost,
  toggleLike,
  posts: { posts },
  user,
  isLogged,
}) => {
  useEffect(() => {
    UserLoaded();
    getProfile();
    getPosts();
  }, [getPosts]);

  // console.log(posts);
  // console.log(user);
  // console.log(isLogged);

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text });
    addPost({ text });
    getPosts();
    setText("");
  };
  return (
    <div className="container">
      <div className="Posts">
        {!posts ? (
          <Spinner />
        ) : (
          <>
            {isLogged && (
              <div className="WriteNewPost">
                <form onSubmit={handleSubmit}>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Share Your thoughts"
                  ></input>
                  <button>submit</button>
                </form>
              </div>
            )}

            {posts.map((post) => {
              return (
                <div className="post" key={post._id}>
                  {post.user.image ? (
                    <img
                      src={`http://localhost:4000/${post.user.image}`}
                      alt="user"
                    />
                  ) : (
                    <img src={defaultImg} alt="default" />
                  )}
                  <div>
                    <h3>{post.name}</h3>
                    <small>
                      <Moment format="YYYY/MM/DD">{post.date}</Moment>
                    </small>
                    <p>{post.text}</p>

                    {user && (
                      <>
                        <span onClick={() => toggleLike(post._id)}>
                          <i className="fas fa-heart"></i>{" "}
                        </span>
                        <span>
                          {post.likes.length > 0 ? post.likes.length : ""}
                        </span>
                      </>
                    )}

                    {user && user._id === post.user._id && (
                      <button onClick={() => deletePost(post._id)}>
                        delete post
                      </button>
                    )}
                  </div>
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
  toggleLike,
})(Home);
