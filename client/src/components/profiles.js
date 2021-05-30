import { useParams } from "react-router";
import { getProfiles } from "../actions/profile";
import { connect } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Spinner from "./spinner";

const Profiles = ({ profile, getProfiles }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfiles(id);
  }, []);

  return (
    <>
      <Navbar />
      {!profile ? (
        <Spinner />
      ) : (
        <div className="profile m-5">
          <div className="profileOverview row">
            <div className="col-9">
              <div className="profileImg">
                {profile.user && profile.user.image && (
                  <img
                    src={`https://manarr.herokuapp.com/${profile.user.image}`}
                    alt="User"
                  />
                )}
              </div>

              <div className="profileData">
                <h1>
                  {profile.user && profile.user.username}
                  <i className="fas fa-grin-beam-sweat"></i>
                </h1>
                <h4>{profile.bio}</h4>
                <span>
                  {profile.social && profile.social.facebook && (
                    <a href={profile.social.facebook} target="blank">
                      <i className="fab fa-facebook-square fa-lg"></i>
                    </a>
                  )}
                </span>
                <span>
                  {profile.social && profile.social.linkedin && (
                    <a href={profile.social.linkedin} target="blank">
                      <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                  )}
                </span>
                <span>
                  {profile.social && profile.social.github && (
                    <a href={profile.social.github} target="blank">
                      <i className="fab fa-github fa-lg"></i>
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToprops = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToprops, { getProfiles })(Profiles);
