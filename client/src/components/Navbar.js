import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

// img
import bg from "../img/2.jpg";

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
      <Link to="/" className="home">
        Home
      </Link>
      <Link to="/profile" className="profile">
        Profile
      </Link>
      <Link to="/" onClick={() => logout()} className="logout">
        Logout
      </Link>
    </div>
  );
  return (
    <>
      <div className="nav">
        <nav>{isLogged ? loggedUser : guest}</nav>
        <img src={bg} alt="color" />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
