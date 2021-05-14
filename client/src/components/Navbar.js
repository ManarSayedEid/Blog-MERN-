import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const Navbar = ({ isLogged, logout }) => {
  const guest = (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
  const loggedUser = (
    <div>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/" onClick={() => logout()}>
        Logout
      </Link>
    </div>
  );
  return (
    <>
      <nav>
        <Link to="/">
          <h1>MANAR</h1>
        </Link>

        {isLogged ? loggedUser : guest}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
