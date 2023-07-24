import React from "react";

import { BsKey } from "react-icons/bs";
import { RxLockOpen1, RxLockClosed } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadUser,
  passwordUpdation,
  setUpdatePassword,
  setUserError,
} from "../slices/userSlice";

import "../styles/UpdatePassword.scss";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const userState = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const { isPasswordUpdate, status, err, isAuthenticated } = userState;
  const [old, setOld] = useState("");
  const [change, setChange] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (isPasswordUpdate) {
      console.log("updated password");
      toast.success("Password Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setUpdatePassword(false));
      dispatch(loadUser());
    }
    if (err != "") {
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
      setUserError("");
    }
  }, [dispatch, isPasswordUpdate, err]);

  const PasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(passwordUpdation(old, change, confirm));
  };

  return (
    <div className="passwordContainer">
      <div className="passwordBox">
        <h3>Update Password</h3>
        <form className="passwordForm" onSubmit={PasswordUpdate}>
          <div className="ipdiv">
            {<BsKey></BsKey>}
            <input
              type="password"
              required
              placeholder="Old Password"
              name="password"
              value={old}
              onChange={(e) => setOld(e.target.value)}
            />
          </div>
          <div className="ipdiv">
            {" "}
            <RxLockOpen1></RxLockOpen1>
            <input
              type="password"
              required
              placeholder="New Password"
              name="New_Password"
              value={change}
              onChange={(e) => setChange(e.target.value)}
            />
          </div>
          <div className="ipdiv">
        
            <RxLockClosed></RxLockClosed>
            <input
              id="newpw"
              type="password"
              required
              placeholder="Confirm Password"
              name="Confirm_password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="org-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
