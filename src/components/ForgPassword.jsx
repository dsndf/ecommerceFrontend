import React, { useEffect } from "react";
import "../styles/Forgot.scss";

import { CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  forgotPassword,
  setForgotRequest,
  setUserError,
} from "../slices/userSlice";
import { toast } from "react-toastify";
import { STATUS } from "../slices/productsSlice";
import Loader from "./Loader";

const Forgforgot = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { forgotRequest, err, status, forgotRes } = userState;
  const [mail, setMail] = useState("");

  const DoForgotPasswordRequest = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", mail);
    dispatch(forgotPassword(myForm));
    setMail("");
  };

  useEffect(() => {
    if(err){
      toast.error(err);
      dispatch(setUserError(""));
    }
    if (forgotRequest) {
      toast.success(forgotRes, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setForgotRequest(false);
    }
  
  }, [dispatch, forgotRequest, err]);

  return (
    <div className="forgotContainer">
      <div className="forgotBox">
       
        {status === STATUS.LOADING ? (
          <Loader />
        ) : ( 
          <form className="forgotForm" onSubmit={DoForgotPasswordRequest}>
            <h3>Forgot Password</h3>
            <div className="ipdiv">
              {" "}
              <CiMail />
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>

            <button type="submit" className="org-btn">
              Send Mail to ...
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Forgforgot;
