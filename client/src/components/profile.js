// react
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
// images
import Spinner from "./spinner";
//redux
import { connect } from "react-redux";
// actions
import {
  deleteProfile,
  getProfile,
  updateProfile,
  uploadImg,
} from "../actions/profile";
//components
import Navbar from "./Navbar";
import { UserLoaded } from "../actions/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({
  isLogged,
  userProfile,
  user,
  UserLoaded,
  getProfile,
  updateProfile,
  deleteProfile,
  uploadImg,
}) => {
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [modal, toggleModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [test, setTest] = useState(1);

  useEffect(() => {
    // get profile after reload
    if (test === 1) {
      getProfile();
      setTest(-1);
    }
    // getProfile();
    console.log(userProfile);

    setBio(userProfile && userProfile.bio ? userProfile.bio : "");
    setFacebook(
      userProfile && userProfile.social?.facebook
        ? userProfile.social.facebook
        : ""
    );
    setLinkedin(
      userProfile && userProfile.social?.linkedin
        ? userProfile.social.linkedin
        : ""
    );
    setGithub(
      userProfile && userProfile.social?.github ? userProfile.social.github : ""
    );
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validURL = require("valid-url");

    if (
      (facebook && !validURL.isUri(facebook)) ||
      (linkedin && !validURL.isUri(linkedin)) ||
      (github && !validURL.isUri(github))
    ) {
      alert("Write valid URL");
    } else {
      console.log({ bio, facebook, linkedin, github });
      await updateProfile({ bio, facebook, linkedin, github });
      await toggleModal(false);
    }
  };

  const handleUploadImg = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    uploadImg(formData);
  };

  // Make it private route
  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div>
        <ToastContainer />

        <Navbar />
        {userProfile === null || user === null || isLogged === false ? (
          <Spinner />
        ) : (
          <>
            <div className="profile m-5">
              <div
                className={
                  modal ? "hidden profileOverview row" : "profileOverview row"
                }
              >
                <div className="col-9">
                  <div className="profileImg">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleUploadImg(e)}
                    />
                    <label
                      htmlFor="file"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" />
                      ) : (
                        <>
                          <img
                            src={`http://localhost:4000/${user.image}`}
                            alt="User"
                          />
                        </>
                      )}
                    </label>
                  </div>

                  <div className="profileData">
                    <h1>
                      {user && user.username}
                      <i className="fas fa-grin-beam-sweat"></i>
                    </h1>
                    <h4>{userProfile.bio}</h4>
                    <span>
                      {userProfile.social && userProfile.social.facebook && (
                        <a href={userProfile.social.facebook} target="blank">
                          <i className="fab fa-facebook-square fa-lg"></i>
                        </a>
                      )}
                    </span>
                    <span>
                      {userProfile.social && userProfile.social.linkedin && (
                        <a href={userProfile.social.linkedin} target="blank">
                          <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                      )}
                    </span>
                    <span>
                      {userProfile.social && userProfile.social.github && (
                        <a href={userProfile.social.github} target="blank">
                          <i className="fab fa-github fa-lg"></i>
                        </a>
                      )}
                    </span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="ProfileManagement">
                    <button onClick={() => toggleModal(true)} className="Edit">
                      Edit profile
                    </button>
                    <button onClick={() => deleteProfile()} className="Delete">
                      Delete profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal */}
              {modal && (
                <>
                  <div className="modal">
                    <div className="profileEdit">
                      <form onSubmit={handleSubmit}>
                        <div className="formGroup">
                          <label>bio:</label>
                          <input
                            type="text"
                            value={bio}
                            placeholder={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                        <div className="formGroup">
                          <label>facebook:</label>
                          <input
                            type="text"
                            value={facebook}
                            placeholder={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </div>
                        <div className="formGroup">
                          <label>linkedin:</label>
                          <input
                            type="text"
                            value={linkedin}
                            placeholder={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </div>
                        <div className="formGroup">
                          <label>github:</label>
                          <input
                            type="text"
                            value={github}
                            placeholder={github}
                            onChange={(e) => setGithub(e.target.value)}
                          />
                        </div>

                        <div className="modalManagement">
                          <button> Edit</button>
                          <button onClick={() => toggleModal(false)}>
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.Auth.isLogged,
    userProfile: state.profile.profile,
    user: state.Auth.user,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  updateProfile,
  deleteProfile,
  uploadImg,
  UserLoaded,
})(Profile);
