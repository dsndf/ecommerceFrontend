import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsKey } from "react-icons/bs";
import { RxLockOpen1, RxLockClosed } from "react-icons/rx";
import "../styles/newPassword.scss";
import { resetPassword, setUserError } from "../slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { STATUS } from "../slices/productsSlice";
import Loader from "./Loader";

const SetNewnewPassword = () => {
  const userState = useSelector((state) => state.userReducer);
  const { isAuthenticated, err, status } = userState;
  const [change, setChange] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  console.log(resetToken);

  const DoPasswordReset = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", change);
    myForm.set("confirmPassword", confirm);
    dispatch(resetPassword(resetToken, myForm));
    setChange("");
    setConfirm("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Password has been reset", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (err != "") {
      toast.error(err);
      setUserError("");
    }
  }, [dispatch, isAuthenticated, err]);

  return (
    <div className="newPasswordContainer">
      <div className="newPasswordBox">
        {status === STATUS.LOADING ? (
          <Loader />
        ) : (
          <form className="newPasswordForm" onSubmit={DoPasswordReset}>
            <h3>New Password</h3>
            <div className="ipdiv">
              {" "}
              <RxLockOpen1 />
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
              {" "}
              <RxLockClosed />
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
              Set Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SetNewnewPassword;
