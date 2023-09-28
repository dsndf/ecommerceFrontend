import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { BsKey } from "react-icons/bs";

import { CgNametag } from "react-icons/cg";
import {
  fetchUser,
  loadUser,
  registerUser,
  setUpdateStatus,
  setUserError,
  updateProfile,
} from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../slices/productsSlice";
import { toast } from "react-toastify";
import { setStatus } from "../slices/userSlice";

import Loader from "./Loader";
import "../styles/UpdateProfile.scss";

import { useEffect } from "react";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const { isUpdated, err, status } = userState;
  const user = userState.userData;
  const { email, name, avatar } = user;
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updateName, setUpdateName] = useState(name);
  const [updateAvatar, setUpdateAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [toggle, setToggle] = useState(false);

  const DoUpdateProfile = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", updateName);
    myForm.set("email", updateEmail);
    if (toggle) {
      myForm.set("avatar", updateAvatar);
    }
    dispatch(updateProfile(myForm));
  };
  const avatarHandler = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    setToggle(true);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setUpdateAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user.avatar) {
      setAvatarPreview(user.avatar.url);
      setUpdateAvatar(user.avatar.url);
    }
    console.log("isUpdated", isUpdated);
    if (isUpdated) {
      toast.success("Profile has Been updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setUpdateStatus(false));
      dispatch(loadUser());
    }

    if (err !== "") {
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setUserError(""));
    }
  }, [isUpdated, user, err]);

  return (
    <div className="updateContainer">
      <div className="updateBox">
        <form className="updateForm" onSubmit={DoUpdateProfile}>
          {status === STATUS.LOADING ? (
            <Loader />
          ) : (
            <>
              {" "}
              <h3 style={{ fontWeight: 500 }}>Update Profile</h3>
              <div className="ipdiv">
                {<CiMail></CiMail>}
                <input
                  type="text"
                  required
                  placeholder="Useremail"
                  name="Name"
                  value={updateName}
                  onChange={(e) => {
                    setUpdateName(e.target.value);
                  }}
                />
              </div>
              <div className="ipdiv">
                {<BsKey></BsKey>}
                <input
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  value={updateEmail}
                  onChange={(e) => {
                    setUpdateEmail(e.target.value);
                  }}
                />
              </div>
              <div className="updateAvatar">
                <input
                  style={{ border: "none" }}
                  type="file"
                  name="avatar"
                  onChange={avatarHandler}
                  accept="image/*"
                  className="file-inp"
                  placeholder="Choose Avatar"
                />
              </div>
              <button type="submit" className="org-btn">
                Update
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
