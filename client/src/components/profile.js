import { useHistory } from "react-router";
import Navbar from "./Navbar";

//redux
import { connect } from "react-redux";
// action
import { getProfile } from "../actions/profile";
import { useEffect } from "react";

const Profile = ({ isLogged, getProfile }) => {
  const history = useHistory();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  if (!isLogged) {
    history.push("/login");
  }
  return (
    <>
      <Navbar />

      <h1>profile</h1>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
  };
};

export default connect(mapStateToProps, { getProfile })(Profile);
