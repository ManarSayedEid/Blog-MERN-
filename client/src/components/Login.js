//redux
import { connect } from "react-redux";
//ation
import { login, UserLoaded } from "../actions/auth";

import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getProfile } from "../actions/profile";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.login({ email, password });
  };

  useEffect(() => {
    props.UserLoaded();
  }, []);

  if (props.isLogged) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login p-5">
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

            <button> Log in</button>

            <p>
              Don't Have an account?
              <Link
                to="register"
                style={{
                  color: "#BD5B5B",
                }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { login, UserLoaded })(Login);
