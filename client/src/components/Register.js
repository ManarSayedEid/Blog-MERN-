import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// image
// import registerImg from "../img/registerImg.jpg";

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

  // use history hook to go to profile (clear login - register to make logout)
  // const history = useHistory();
  if (props.isLogged) {
    return <Redirect to="/profile" />;
    // history.push("/profile");
  }

  return (
    <div className="register">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <Link to="/">
              <h1>MANAR</h1>
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
              Have an account? <Link to="login"> Sign in</Link>
            </p>
          </form>
        </div>

        {/* <div className="col">
          <img src={registerImg} alt="register" />
        </div> */}
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
