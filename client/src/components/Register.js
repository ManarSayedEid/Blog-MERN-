import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// action
import { register } from "../actions/auth.js";

//react-redux
import { connect } from "react-redux";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGenderr] = useState("Female");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.register({ username, email, password, gender });
  };

  if (props.isLogged) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="register ">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <Link
              to="/"
              style={{
                color: "#BD5B5B",
                margin: "1rem",
              }}
            >
              <h1>HOME</h1>
            </Link>

            <label>Name:</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGenderr(e.target.value)}>
              <option value="Female"> Female </option>
              <option value="Male">Male</option>
            </select>

            <button> Register</button>

            <p>
              Have an account?
              <Link
                to="login"
                style={{
                  color: "#BD5B5B",
                }}
              >
                {" "}
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="col m-5"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
  };
};

export default connect(mapStateToProps, { register })(Register);
