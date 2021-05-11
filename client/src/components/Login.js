import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    console.log(userData);
  };
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

export default Login;
