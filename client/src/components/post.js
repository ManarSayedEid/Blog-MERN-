import { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { addComment, deleteComment, getPost } from "../actions/post";

const Post = ({ user, post: { post }, getPost, addComment, deleteComment }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, []);

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(post._id, { text });
    setText("");
  };

  return (
    <>
      {post && (
        <>
          <div className="container posts">
            <Link to="/">
              <button>Back To Posts</button>{" "}
            </Link>
            <div className="post">
              <img
                src={`https://gentle-ridge-09301.herokuapp.com/${post.user.image}`}
                alt="user"
              />{" "}
              <div>
                <h3>{post.name}</h3>
                <small>
                  <Moment format="YYYY/MM/DD">{post.date}</Moment>
                </small>
                <p>{post.text}</p>
              </div>
            </div>

            {post.comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <img
                  src={`https://gentle-ridge-09301.herokuapp.com/${comment.image}`}
                  alt="user"
                />
                <div>
                  <h3>{comment.name}</h3>
                  <small>
                    <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                  </small>
                  <p>{comment.text}</p>
                </div>
                {user && user._id === comment.user && (
                  <button onClick={() => deleteComment(post._id, comment._id)}>
                    <span>
                      <i className="fas fa-times"></i>
                    </span>
                  </button>
                )}
              </div>
            ))}
            {user && (
              <div className="PostComment">
                <form onSubmit={handleSubmit}>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="add a comment"
                  ></input>
                  <button>Comment</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  post: state.post,
});

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
  Post
);
