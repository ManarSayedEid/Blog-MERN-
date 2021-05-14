//redux
import { connect } from "react-redux";
//ation
import { login } from "../actions/auth";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userData = { email, password };

    // console.log(userData);
    await props.login({ email, password });
  };

  // use history hook to go to profile (clear login - register to make logout)
  const history = useHistory();
  if (props.isLogged) {
    history.push("/profile");
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Link to="/">
          <h1>MANAR</h1>
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
          Don't Have an account? <Link to="register"> Register</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
  };
};

export default connect(mapStateToProps, { login })(Login);
