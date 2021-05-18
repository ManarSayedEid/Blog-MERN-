import { Redirect } from "react-router";
import Navbar from "./Navbar";

//redux
import { connect } from "react-redux";
// action
import { deleteProfile, getProfile, updateProfile } from "../actions/profile";
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import defaultImg from "../img/defaultImg.jpg";

const Profile = ({
  isLogged,
  userProfile,
  user,
  getProfile,
  updateProfile,
  deleteProfile,
}) => {
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [modal, toggleModal] = useState(false);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
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
    console.log({ bio, facebook, linkedin, github });

    await updateProfile({ bio, facebook, linkedin, github });
    alert("Profile updated");
    await toggleModal(false);
  };

  const handleUploadImg = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    console.log(previewImage);

    const fData = new FormData();
    image && fData.append("profile Image", image, "no");
    console.log(fData);
    console.log(image);

    await updateProfile({ bio, facebook, linkedin, github, fData });
    alert("Profile updated");
    // post request to end point and send this form data
    // await axios.post("api/users/img", fData, {
    //   headers: {
    //     authorization: localStorage.token,
    //   },
    // });
  };

  if (!isLogged) {
    return <Redirect to="/login" />;
  }
  console.log(userProfile);
  console.log(user);
  return (
    <>
      <div className="container">
        <Navbar />
        {userProfile === null || user === null || isLogged === false ? (
          <Spinner />
        ) : (
          <>
            <div className="profile m-5">
              <div
                className={
                  modal ? "hidden profile__overview" : "profile__overview"
                }
              >
                {/* <img
                  src={image ? image : defaultImg}
                  alt="profile img"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
                <input type="file" onChange={(e) => handleUploadImg(e)} /> */}

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
                  <img
                    src={image ? previewImage : defaultImg}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                    }}
                  />
                </label>

                <div style={{ margin: "50px" }}></div>
                <button onClick={() => toggleModal(true)}> Edit profile</button>
                <button onClick={() => deleteProfile()}>Delete profile</button>
                <h1>{user.username}</h1>
                <h2>{user.email}</h2>
                <h3>{user.gender}</h3>
                <h4>
                  {userProfile !== undefined &&
                    userProfile.bio !== "" &&
                    userProfile.bio}
                </h4>
                <h4>
                  {userProfile !== undefined &&
                    userProfile.social !== undefined &&
                    userProfile.social.facebook !== "" &&
                    userProfile.social.facebook}
                </h4>
                <h4>
                  {userProfile !== undefined &&
                    userProfile.social !== undefined &&
                    userProfile.social.linkedin !== "" &&
                    userProfile.social.linkedin}
                </h4>
                <h4>
                  {userProfile !== undefined &&
                    userProfile.social !== undefined &&
                    userProfile.social.github !== "" &&
                    userProfile.social.github}
                </h4>
              </div>

              {/* Modal */}
              {modal && (
                <>
                  <div className="modal">
                    <div className="profile__form">
                      <form onSubmit={handleSubmit}>
                        <label>bio:</label>
                        <input
                          type="text"
                          value={bio}
                          placeholder={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />

                        <label>facebook:</label>
                        <input
                          type="text"
                          value={facebook}
                          placeholder={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />

                        <label>linkedin:</label>
                        <input
                          type="text"
                          value={linkedin}
                          placeholder={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                        />
                        <label>github:</label>
                        <input
                          type="text"
                          value={github}
                          placeholder={github}
                          onChange={(e) => setGithub(e.target.value)}
                        />
                        <button> Submit</button>
                        <button onClick={() => toggleModal(false)}>
                          Close
                        </button>
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
})(Profile);
